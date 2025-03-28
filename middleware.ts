import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/better-auth/auth";
import { protectedRoutes } from "@/lib/constants/env";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for public routes & static files
  if (
    path.startsWith("/_next") || // Next.js internals
    path.startsWith("/sign-in") || // Public auth page
    path.match(/\.(ico|svg|png|jpg|jpeg|css|js)$/) // Static files
  ) {
    return NextResponse.next();
  }

  // Check if the current path is a private route
  const isPrivateRoute = protectedRoutes.some((route) => {
    if (route.includes(":path*")) {
      const basePath = route.replace("/:path*", "");
      return path.startsWith(basePath);
    }
    return path === route; // Exact match
  });

  if (isPrivateRoute) {
    const session = await auth.api.getSession({
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    if (!session) {
      // Redirect to sign-in with a return URL
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Specific paths (recommended)
    "/dashboard",
    "/dashboard/:path*",

    // OR regex for advanced matching:
    "/((?!api|trpc|_next/static|_next/image|favicon.ico).*)",

    // "/api/protected/:path*", // Protect certain APIs
    // "/api/:path*", // Protect certain APIs
  ],
};
