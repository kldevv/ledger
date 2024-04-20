import NextAuth from 'next-auth'

import { PrismaAdapter } from './adapters/prisma'
import { GithubAuth } from './providers/github'

export default NextAuth({
  providers: [GithubAuth],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter,
  session: {
    // In second, set to 1 hour
    maxAge: 60 * 60,
    strategy: 'database',
  },
  callbacks: {
    session: ({ session, user }) => {
      session.user.id = user.id

      return session
    },
  },
})
