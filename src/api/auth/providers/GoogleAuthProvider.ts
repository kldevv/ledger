import Google from 'next-auth/providers/google'

import logger from '@/server/logger'

export const GoogleAuthProvider = (() => {
  if (process.env.AUTH_GOOGLE_ID == null) {
    logger.error(
      '[GoogleAuthProvider] Missing AUTH_GOOGLE_ID in the environment',
    )
    throw new Error(
      '[GoogleAuthProvider] Missing AUTH_GOOGLE_ID in the environment',
    )
  }

  if (process.env.AUTH_GOOGLE_SECRET == null) {
    logger.error(
      '[GoogleAuthProvider] Missing AUTH_GOOGLE_SECRET in the environment',
    )
    throw new Error(
      '[GoogleAuthProvider] Missing AUTH_GOOGLE_SECRET in the environment',
    )
  }

  return Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  })
})()
