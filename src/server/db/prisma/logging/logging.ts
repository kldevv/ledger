import logger, { loggerMessage } from '@/server/logger'

import type { Prisma } from '@prisma/client'

export const logPrismaQueryEvent = (event: Prisma.QueryEvent) => {
  if (
    event.query.includes('INSERT') ||
    event.query.includes('UPDATE') ||
    event.query.includes('DELETE')
  ) {
    logger.info(loggerMessage.PrismaMutationExecuted, { event })
  }
}

export const logPrismaWarnEvent = (event: Prisma.LogEvent) => {
  logger.warn(loggerMessage.PrismaWarn, { event })
}

export const logPrismaErrorEvent = (event: Prisma.LogEvent) => {
  logger.error(loggerMessage.PrismaError, { event })
}
