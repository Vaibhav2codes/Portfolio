const DEFAULT_RESUME_FILE_NAME = "Vaibhav_SDE_Resume.pdf";

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function buildSupabaseResumeUrl() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
  const objectPath = process.env.NEXT_PUBLIC_SUPABASE_OBJECT_PATH || RESUME_FILE_NAME;

  if (!supabaseUrl || !bucket || !objectPath) {
    return null;
  }

  return `${trimTrailingSlash(supabaseUrl)}/storage/v1/object/public/${bucket}/${objectPath}`;
}

export const RESUME_FILE_NAME = process.env.NEXT_PUBLIC_RESUME_FILE_NAME || DEFAULT_RESUME_FILE_NAME;
export const RESUME_PUBLIC_URL = process.env.NEXT_PUBLIC_RESUME_URL || buildSupabaseResumeUrl() || "/api/resume/file";
