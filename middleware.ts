import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://related-llama-43187.upstash.io",
  token:
    "AaizACQgNjEzOTFhNjAtMmM0Zi00NTM0LTk4MzItZGNmYmYzMjYzNWM0MTM3ZDJlZTM0OWM3NGJhY2JhZGEzMDRjMzE3YzBlMWQ=",
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "8 h"),
});
export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );

  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return success ? res : NextResponse.redirect(new URL("/blocked", req.url));
}

export const config = {
  matcher: "/api/messages",
};