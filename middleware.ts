import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secureCookie: process.env.NEXTAUTH_URL?.startsWith("https://"),
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname, origin } = req.nextUrl;

  // Allow these routes to be accessed without authentication
  if (
    pathname === "/register" ||
    pathname === "/login" ||
    pathname === "/forgot-password"
  ) {
    return NextResponse.next();
  }

  // Protect all other routes
  if (!session) {
    return NextResponse.redirect(`${origin}/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
