import Github from 'next-auth/providers/github'

import { logger } from '@/server/logger'
import { LoggerMessage } from '@/server/logger/messages'

export const GithubAuthProvider = (() => {
  if (process.env.AUTH_GITHUB_ID == null) {
    logger.error(LoggerMessage.MISSING_AUTH_GITHUB_ID)
    throw new Error(LoggerMessage.MISSING_AUTH_GITHUB_ID)
  }

  if (process.env.AUTH_GITHUB_SECRET == null) {
    logger.error(LoggerMessage.MISSING_AUTH_GITHUB_SECRET)
    throw new Error(LoggerMessage.MISSING_AUTH_GITHUB_SECRET)
  }

  return Github({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  })
})()
