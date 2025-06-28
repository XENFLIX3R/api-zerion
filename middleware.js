import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/api')) {
    return NextResponse.next();
  }
  
  return new Response(
    JSON.stringify({
      error: "Route not found",
      status: 404
    }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
