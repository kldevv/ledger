import NextAuth from 'next-auth'

import { GithubAuth } from './providers/github'

export default NextAuth({
  providers: [GithubAuth],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // In second, set to 1 hour
    maxAge: 60 * 60,
    strategy: 'database',
  },
})
