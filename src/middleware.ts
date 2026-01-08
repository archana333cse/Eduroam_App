import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname, searchParams } = req.nextUrl;
    
    // Check if this is the special login redirect from LoginForm.tsx
    const isLoginRedirect = searchParams.get('login') === 'true';

    // --- 1. Admin Role: Access Control ---
    // Rule: 'admin' users CANNOT access '/dashboard/log-analyzer'
    if (token?.role === "admin" && pathname.startsWith("/dashboard/log-analyzer")) {
      // Redirect them back to their allowed dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // --- 2. SuperAdmin Role: Login Redirect ---
    // Rule: 'superAdmin' users, on initial login, redirect to '/log-analyzer'
    if (token?.role === "superAdmin" && pathname === "/dashboard" && isLoginRedirect) {
      // This is the initial login. Redirect them to their primary view.
      // We strip the query param during the redirect.
      return NextResponse.redirect(new URL("/dashboard/log-analyzer", req.url));
    }
    
    // --- 3. Default ---
    // For all other cases, allow the request to continue.
    // This covers:
    // - 'admin' on '/dashboard'
    // - 'superAdmin' on '/dashboard/log-analyzer'
    // - 'superAdmin' on '/dashboard' (after login, when isLoginRedirect is false)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // This ensures only logged-in users (with a token) can access
        // the routes matched by the 'matcher' config below.
        return !!token;
      },
    },
  }
);

// This 'matcher' config applies the middleware to your protected routes.
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*", // This covers /dashboard/log-analyzer and any other sub-routes
  ],
};