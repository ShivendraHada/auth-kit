import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import getEnv from "./utils/envConfig";

export default async function middleware(req: NextRequest) {
  const { NEXTAUTH_SECRET } = getEnv();

  const session = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
  });

  const { pathname, origin } = req.nextUrl;

  // Allow these routes to be accessed without authentication
  if (
    pathname === "/register" ||
    pathname === "/login" ||
    pathname === "/forgotPassword"
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
