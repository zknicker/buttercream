declare namespace Cloudflare {
  interface Env {
    CLERK_SECRET_KEY?: string;
    DB: D1Database;
    DEV_CLERK_SIGN_IN_USER_ID?: string;
  }
}
