import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // 1. Check for valid token first
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET!)
            
            // Redirect authenticated users away from auth pages
            if (pathname.startsWith('/auth')) {
                return NextResponse.redirect(new URL('/home', request.url))
            }
        } catch (error) {
            const response = NextResponse.redirect(new URL('/auth', request.url))
            response.cookies.delete('token')
            return response
        }
    } else {
        // Redirect unauthenticated users trying to access protected routes
        if (!pathname.startsWith('/auth')) {
            return NextResponse.redirect(new URL('/auth', request.url))
        }
    }

    return NextResponse.next()
}

// Configure matcher to protect all routes except auth
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|auth).*)']
} 