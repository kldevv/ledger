import { logger } from '@/server/logger'
import { LoggerMessage } from '@/server/logger/messages'

import type { Prisma } from '@prisma/client'

export const logPrismaQueryEvent = (event: Prisma.QueryEvent) => {
  if (
    event.query.includes('INSERT') ||
    event.query.includes('UPDATE') ||
    event.query.includes('DELETE')
  ) {
    logger.info(LoggerMessage.PrismaMutationExecuted, { event })
  }
}

export const logPrismaWarnEvent = (event: Prisma.LogEvent) => {
  logger.warn(LoggerMessage.PrismaWarn, { event })
}

export const logPrismaErrorEvent = (event: Prisma.LogEvent) => {
  logger.error(LoggerMessage.PrismaError, { event })
}
