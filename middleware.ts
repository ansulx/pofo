import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow Sanity Studio
  if (pathname.startsWith('/studio')) {
    return NextResponse.next()
  }
  
  // Your other middleware logic here...
  
  return NextResponse.next()
} 