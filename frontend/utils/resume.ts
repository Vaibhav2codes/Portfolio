const DEFAULT_RESUME_FILE_NAME = "Vaibhav_SDE_Resume.pdf";

export const RESUME_FILE_NAME = process.env.NEXT_PUBLIC_RESUME_FILE_NAME || DEFAULT_RESUME_FILE_NAME;

// Served straight from frontend/public so it never depends on the backend being awake.
// To update it, replace frontend/public/Vaibhav_SDE_Resume.pdf (same file name) and push.
export const RESUME_PUBLIC_URL = `/${DEFAULT_RESUME_FILE_NAME}`;
