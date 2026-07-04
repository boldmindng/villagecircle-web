/**
 * proxy.ts — Next.js 16.2 edge proxy (replaces middleware.ts)
 *
 * Responsibilities:
 *   1. Protect /vibe-coders/portal/* — require active SSO session
 *   2. Redirect /vibe-coders/portal  → /vibe-coders/portal/  (trailing slash hygiene)
 *   3. Pass `boldmind_sso` cookie to boldmind-service for session validation
 *   4. CSP + security headers on every response
 */

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// ─── Constants ────────────────────────────────────────────────────────────────

const SSO_COOKIE = "boldmind_sso";
const PORTAL_PREFIX = "/vibe-coders/portal";
const PORTAL_LOGIN = "/vibe-coders/portal/login";
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.boldmind.ng";

// ─── Security headers ─────────────────────────────────────────────────────────

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    `connect-src 'self' ${API_BASE} https://va.vercel-scripts.com`,
    "img-src 'self' data: blob: https://*.cloudflare.com https://*.r2.dev",
    "frame-ancestors 'none'",
  ].join("; "),
};

// ─── Proxy handler ────────────────────────────────────────────────────────────

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Attach security headers to every response
  const response = NextResponse.next();
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // ── Portal protection ──────────────────────────────────────────────────────
  if (pathname.startsWith(PORTAL_PREFIX) && pathname !== PORTAL_LOGIN) {
    const ssoCookie = request.cookies.get(SSO_COOKIE);

    if (!ssoCookie?.value) {
      const loginUrl = new URL(PORTAL_LOGIN, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Fast-path: validate session against service (edge-compatible fetch)
    try {
      const validateRes = await fetch(`${API_BASE}/api/v1/sso/validate`, {
        headers: {
          Cookie: `${SSO_COOKIE}=${ssoCookie.value}`,
          "Content-Type": "application/json",
        },
        // next.js edge runtime does not support keepAlive — omit
        signal: AbortSignal.timeout(3000),
      });

      if (!validateRes.ok) {
        const loginUrl = new URL(PORTAL_LOGIN, request.url);
        loginUrl.searchParams.set("redirect", pathname);
        loginUrl.searchParams.set("reason", "session_expired");
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // Service unreachable — allow through and let the page handle it
      // This prevents a cold-start outage from locking all portal users out
    }
  }

  return response;
}

// ─── Matcher config ───────────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *  - _next/static  (static files)
     *  - _next/image   (image optimisation)
     *  - favicon.ico, public assets
     *  - api/ routes (handled by Next.js route handlers)
     */
    "/((?!_next/static|_next/image|favicon|icons|public|site.webmanifest|sw.js|ads.txt).*)",
  ],
};
