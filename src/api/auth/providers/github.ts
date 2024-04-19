import Github from 'next-auth/providers/github'

import logger from '@/server/logger'

export const GithubAuth = (() => {
  if (process.env.AUTH_GITHUB_ID == null) {
    logger.error('[GithubAuth] Missing AUTH_GITHUB_ID in the environment')
    throw new Error('[GithubAuth] Missing AUTH_GITHUB_ID in the environment')
  }

  if (process.env.AUTH_GITHUB_SECRET == null) {
    logger.error('[GithubAuth] Missing AUTH_GITHUB_SECRET in the environment')
    throw new Error(
      '[GithubAuth] Missing AUTH_GITHUB_SECRET in the environment',
    )
  }

  return Github({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  })
})()
