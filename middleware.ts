import { NextRequest } from "next/server";
import { updateSession } from "./lib/auth";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  
  const session = await getSession();
  if(!session && request.nextUrl.pathname.startsWith('/dashboard')){
    return Response.redirect(new URL('/login', request.url));
  }
  if(session && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register'))){
    return (await updateSession(request) && Response.redirect(new URL('/dashboard', request.url)));
  }
  return await updateSession(request);
  
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}