import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|webp|webmanifest)(?:$|\\?)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
