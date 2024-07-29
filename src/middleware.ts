import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });//Ye code NextAuth.js ka getToken function use karta hai jo request object se JWT (JSON Web Token) ko retrieve karta hai. Iska main kaam hai user ke authentication token ko extract karna.

  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify") ||
      url.pathname.startsWith("/"))
  ) { // u r alredy authenticated
    return NextResponse.redirect(new URL("/dasboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}
