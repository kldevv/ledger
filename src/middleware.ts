import { NextResponse, type NextRequest } from 'next/server'

import { route } from './shared/route'

import type { Session } from 'next-auth'

const sessionUrl =
  process.env.NEXTAUTH_URL_INTERNAL ??
  process.env.NEXTAUTH_URL + '/api/auth/session'

const getSession = async (req: NextRequest) => {
  const response = await fetch(sessionUrl, {
    headers: req.headers,
  })

  if (!response.ok) {
    return null
  }

  const session = (await response.json()) as Session

  if (
    Object.keys(session).length === 0 ||
    new Date(session.expires) <= new Date()
  ) {
    return null
  }

  return session
}

export const middleware = async (req: NextRequest) => {
  const session = await getSession(req)

  if (session == null && req.nextUrl.pathname !== route.core.signIn.pathname) {
    return NextResponse.redirect(new URL(route.core.signIn.pathname, req.url))
  }

  if (session != null && req.nextUrl.pathname === route.core.signIn.pathname) {
    return NextResponse.redirect(new URL(route.core.home.pathname, req.url))
  }

  const res = NextResponse.next()

  res.headers.set('x-middleware-cache', 'no-cache')

  return res
}

export const config = {
  matcher: [
    '/',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|404|401|500).*)',
  ],
}
