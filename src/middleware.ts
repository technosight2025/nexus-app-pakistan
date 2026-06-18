import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/register(.*)',
  '/api/auth/register(.*)',
  '/',
  '/home(.*)',
  '/marketplace(.*)',
  '/explore(.*)',
  '/launch-journey(.*)',
  '/sso-callback(.*)',
  '/onboarding(.*)',
  '/api/auth/vendor-sync(.*)',
  '/venues(.*)',
  '/rentals(.*)',
  '/vendor/(.*)',
  '/invite/(.*)',
  '/api/webhook(.*)',
  '/api/rentals/book',
]);

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url)
  
  // Custom MVP Security: We will handle dashboard protection inside the dashboard layout
  // instead of middleware, to prevent infinite redirect loops for incomplete accounts.

  // TEMPORARILY BYPASSING AUTH FOR DEVELOPMENT
  // if (!isPublicRoute(request)) {
  //   await auth.protect();
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
