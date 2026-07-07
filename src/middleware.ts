import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [type, credentials] = authHeader.split(" ");
    if (type === "Basic") {
      const [user, pass] = Buffer.from(credentials, "base64").toString().split(":");
      if (
        user === process.env.ADMIN_USERNAME &&
        pass === process.env.ADMIN_PASSWORD
      ) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse(null, {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Analytics"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
