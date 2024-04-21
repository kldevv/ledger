import NextAuth from 'next-auth'

import { route } from '@/shared/route'

import { PrismaAdapter } from './adapters/PrismaAdapter'
import { GithubAuthProvider, GoogleAuthProvider } from './providers'

import type { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
  providers: [GithubAuthProvider, GoogleAuthProvider],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter,
  session: {
    // In second, set to 1 hour
    maxAge: 60 * 60,
    strategy: 'database',
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }),
  },
  pages: {
    signIn: route.core.signIn.pathname,
  },
} as const

export default NextAuth(authOptions)
