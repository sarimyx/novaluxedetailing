import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
  getAuth,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);

export default clerkMiddleware(async (auth, req, event) => {
  const user = await auth();
  if (!user.userId && isProtectedRoute(req)) {
    return user.redirectToSignIn();
  }
  if (req.nextUrl.pathname.startsWith("/dashboard/staff")) {
    if (user.orgSlug !== "staff") {
      return NextResponse.redirect(new URL("/select-organization", req.url));
    }
  } else if (
    req.nextUrl.pathname.startsWith("/dashboard/provider") &&
    user.orgSlug === "provider"
  ) {
    if (user.orgSlug !== "provider") {
      return NextResponse.redirect(new URL("/select-organization", req.url));
    }
  } else if (req.nextUrl.pathname.startsWith("/dashboard/customer")) {
    if (user.orgSlug !== undefined) {
      return NextResponse.redirect(new URL("/select-organization", req.url));
    }
  } else if (req.nextUrl.pathname.startsWith("/dashboard") && !user.orgSlug) {
    if (user.orgSlug === undefined) {
      return NextResponse.redirect(new URL("/dashboard/customer", req.url));
    } else {
      return NextResponse.redirect(new URL("/select-organization", req.url));
    }
  }

  return NextResponse.next();
});
