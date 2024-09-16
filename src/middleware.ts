import { NextRequest, NextResponse } from 'next/server'

const allowedPattern = /^[a-zA-Z0-9\u0600-\u06FF]+$/

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	const pathSegment = pathname.split('/').pop() || ''

	if (!allowedPattern.test(pathSegment)) {
		return NextResponse.redirect(new URL('/404', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/i/:path*',
}
