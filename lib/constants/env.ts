export const BASE_URL = process.env.BETTER_AUTH_URL || "";
export const MONGODB_URL = process.env.MONGO_DB_CONNECTION_STRING || "";
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || "";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
export const SMTP_PORT = process.env.SMTP_PORT || "587";
export const MAIL_USER = process.env.MAIL_USER || "credentialsNotFound";
export const MAIL_PASS = process.env.MAIL_PASS || "credentialsNotFound";
export const SMTP_SECURE = process.env.SMTP_SECURE || false;

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME || "Shahriar Ahmed Biddut";
export const SENDER_NAME =
  process.env.NEXT_PUBLIC_SENDER_NAME || "Shahriar Ahmed Biddut";
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Next.js Description Boilerplate";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/";
export const SITE_EMAIL = process.env.SITE_EMAIL || "credentialsNotFound";

const isGoogleEnabled = !!process.env.GOOGLE_CLIENT_ID;
const isGitHubEnabled = !!process.env.GITHUB_CLIENT_ID;

export const NEXT_PUBLIC_GOOGLE = isGoogleEnabled;
export const NEXT_PUBLIC_GITHUB = isGitHubEnabled;

export const protectedRoutes = [
  "/dashboard",
  "/dashboard/:path*", // All subroutes under /dashboard
];
// Define routes that logged-in users **should not** access
export const loggedInInvalidRoutes = [
  "/sign-",
  "/email-verification",
  "/reset-password",
  "/2fa-verification",
];
