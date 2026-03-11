export type GithubProfile = {
  avatar_url: string;
  followers: number;
  following: number;
  html_url: string;
  login: string;
  name: string | null;
  public_repos: number;
};

export type GithubRepository = {
  description: string | null;
  fork: boolean;
  forks_count: number;
  html_url: string;
  id: number;
  language: string | null;
  name: string;
  stargazers_count: number;
  updated_at: string;
};

export type GithubContributionDay = {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
};

type GithubContributionResponse = {
  contributions: GithubContributionDay[];
};

type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

export type GithubActivitySummary = {
  profile: {
    avatarUrl: string;
    displayName: string;
    profileUrl: string;
    username: string;
  };
  recentRepositories: Array<{
    description: string | null;
    forks: number;
    htmlUrl: string;
    id: number;
    language: string | null;
    name: string;
    stars: number;
    updatedAt: string;
  }>;
  stats: {
    followers: number;
    following: number;
    totalCommits: number | null;
    totalRepositories: number;
    totalStars: number;
  };
  topLanguages: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  warnings: string[];
};

export class GithubApiError extends Error {
  readonly resetAt?: string;
  readonly status?: number;

  constructor(message: string, status?: number, resetAt?: string) {
    super(message);
    this.name = "GithubApiError";
    this.status = status;
    this.resetAt = resetAt;
  }
}

const CACHE_PREFIX = "github-activity-cache:v1";
const DEFAULT_CACHE_TTL_MS = 1000 * 60 * 30;
const GITHUB_API_BASE_URL = "https://api.github.com";
const CONTRIBUTIONS_API_BASE_URL = "https://github-contributions-api.jogruber.de/v4";
const memoryCache = new Map<string, CacheEntry<unknown>>();

const LANGUAGE_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#14b8a6", "#f97316", "#a855f7"];

function isCacheFresh<T>(entry: CacheEntry<T>, ttlMs: number) {
  return Date.now() - entry.timestamp < ttlMs;
}

function getStorageKey(cacheKey: string) {
  return `${CACHE_PREFIX}:${cacheKey}`;
}

function readCachedEntry<T>(cacheKey: string): CacheEntry<T> | null {
  const inMemory = memoryCache.get(cacheKey) as CacheEntry<T> | undefined;

  if (inMemory) {
    return inMemory;
  }

  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(getStorageKey(cacheKey));

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue) as CacheEntry<T>;

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.timestamp !== "number" ||
      !("data" in parsed)
    ) {
      return null;
    }

    memoryCache.set(cacheKey, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function writeCachedEntry<T>(cacheKey: string, data: T) {
  const entry: CacheEntry<T> = {
    data,
    timestamp: Date.now()
  };

  memoryCache.set(cacheKey, entry);

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(getStorageKey(cacheKey), JSON.stringify(entry));
  } catch {
    // Ignore storage write failures and continue with in-memory cache.
  }
}

function createGithubErrorMessage(response: Response, details?: string) {
  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = response.headers.get("x-ratelimit-reset");
  const resetAt = reset ? new Date(Number(reset) * 1000).toLocaleString() : undefined;

  if (remaining === "0") {
    return new GithubApiError(
      `GitHub API rate limit reached. Try again after ${resetAt ?? "the current window resets"}.`,
      response.status,
      resetAt
    );
  }

  return new GithubApiError(
    details || `GitHub request failed with status ${response.status}.`,
    response.status,
    resetAt
  );
}

async function parseErrorDetails(response: Response) {
  try {
    const payload = (await response.json()) as { message?: string; error?: string };
    return payload.message || payload.error;
  } catch {
    return undefined;
  }
}

async function fetchJsonWithCache<T>(
  url: string,
  cacheKey: string,
  ttlMs: number = DEFAULT_CACHE_TTL_MS,
  init?: RequestInit
) {
  const cached = readCachedEntry<T>(cacheKey);

  if (cached && isCacheFresh(cached, ttlMs)) {
    return cached.data;
  }

  try {
    const response = await fetch(url, {
      ...init,
      cache: "no-store"
    });

    if (!response.ok) {
      const details = await parseErrorDetails(response);
      throw createGithubErrorMessage(response, details);
    }

    const data = (await response.json()) as T;
    writeCachedEntry(cacheKey, data);
    return data;
  } catch (error) {
    if (cached) {
      return cached.data;
    }

    if (error instanceof GithubApiError) {
      throw error;
    }

    throw new GithubApiError(
      error instanceof Error ? error.message : "Unable to fetch GitHub data at the moment."
    );
  }
}

export async function fetchGithubProfile(username: string) {
  return fetchJsonWithCache<GithubProfile>(
    `${GITHUB_API_BASE_URL}/users/${username}`,
    `${username}:profile`,
    DEFAULT_CACHE_TTL_MS,
    {
      headers: {
        Accept: "application/vnd.github+json"
      }
    }
  );
}

export async function fetchGithubRepositories(username: string) {
  return fetchJsonWithCache<GithubRepository[]>(
    `${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
    `${username}:repos`,
    DEFAULT_CACHE_TTL_MS,
    {
      headers: {
        Accept: "application/vnd.github+json"
      }
    }
  );
}

export async function fetchGithubContributions(username: string) {
  const response = await fetchJsonWithCache<GithubContributionResponse>(
    `${CONTRIBUTIONS_API_BASE_URL}/${username}?y=last`,
    `${username}:contributions`,
    DEFAULT_CACHE_TTL_MS
  );

  return response.contributions.slice(-365);
}

function sortRepositoriesByUpdatedAt(repositories: GithubRepository[]) {
  return [...repositories].sort(
    (left, right) => new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime()
  );
}

function buildLanguageStats(repositories: GithubRepository[]) {
  const languageFrequency = repositories.reduce<Record<string, number>>((accumulator, repository) => {
    if (!repository.language) {
      return accumulator;
    }

    accumulator[repository.language] = (accumulator[repository.language] || 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(languageFrequency)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([name, value], index) => ({
      color: LANGUAGE_COLORS[index % LANGUAGE_COLORS.length],
      name,
      value
    }));
}

export async function fetchGithubActivitySummary(username: string): Promise<GithubActivitySummary> {
  const [profile, repositories] = await Promise.all([
    fetchGithubProfile(username),
    fetchGithubRepositories(username)
  ]);

  const primaryRepositories = sortRepositoriesByUpdatedAt(repositories.filter((repository) => !repository.fork));
  const warnings: string[] = [];
  let totalCommits: number | null = null;

  try {
    const contributions = await fetchGithubContributions(username);
    totalCommits = contributions.reduce((sum, day) => sum + day.count, 0);
  } catch (error) {
    warnings.push(
      error instanceof Error
        ? `${error.message} Commit totals are temporarily unavailable.`
        : "Commit totals are temporarily unavailable."
    );
  }

  return {
    profile: {
      avatarUrl: profile.avatar_url,
      displayName: profile.name || profile.login,
      profileUrl: profile.html_url,
      username: profile.login
    },
    recentRepositories: primaryRepositories.slice(0, 5).map((repository) => ({
      description: repository.description,
      forks: repository.forks_count,
      htmlUrl: repository.html_url,
      id: repository.id,
      language: repository.language,
      name: repository.name,
      stars: repository.stargazers_count,
      updatedAt: repository.updated_at
    })),
    stats: {
      followers: profile.followers,
      following: profile.following,
      totalCommits,
      totalRepositories: profile.public_repos,
      totalStars: primaryRepositories.reduce((sum, repository) => sum + repository.stargazers_count, 0)
    },
    topLanguages: buildLanguageStats(primaryRepositories),
    warnings
  };
}
