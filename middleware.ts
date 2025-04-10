import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("Middleware - Session:", session);
    console.log("Middleware - Path:", req.nextUrl.pathname);
    console.log("Middleware - Cookies:", req.cookies.getAll());

    // If user is not signed in and the current path is not /login or /signup,
    // redirect the user to /login
    if (!session && !["/login", "/signup"].includes(req.nextUrl.pathname)) {
      console.log("No session, redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is signed in and the current path is /login or /signup,
    // redirect the user to /dashboard
    if (session && ["/login", "/signup"].includes(req.nextUrl.pathname)) {
      console.log("Session exists, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
