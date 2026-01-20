
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAdminAuthenticated } from './lib/auth'; // Assuming this function exists and works as expected

export async function middleware(request: NextRequest) {
  // Check if the request path is under the /admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // We need to run authentication checks here.
    // For now, we will assume isAdminAuthenticated works.
    // In a real scenario, this function would check the user's session and roles.
    const authenticated = await isAdminAuthenticated(request);

    if (!authenticated) {
      // If not authenticated, redirect to the home page or a login page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Matcher to specify which routes the middleware should run on
  matcher: '/admin/:path*',
};
