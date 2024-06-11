import { PrismaClient } from '@prisma/client'

import { logger } from '@/server/logger'
import { LoggerMessage } from '@/server/logger/messages'

import {
  logPrismaErrorEvent,
  logPrismaQueryEvent,
  logPrismaWarnEvent,
} from './logging/logging'
import { prismaOptions } from './options'

import type { Prisma } from '@prisma/client'

const prismaClientSingleton = () => {
  logger.info(LoggerMessage.PrismaIniting)

  try {
    const client = new PrismaClient<
      typeof prismaOptions,
      Exclude<Prisma.LogLevel, 'info'>
    >(prismaOptions)

    client.$on('query', logPrismaQueryEvent)
    client.$on('error', logPrismaErrorEvent)
    client.$on('warn', logPrismaWarnEvent)

    logger.error(LoggerMessage.PrismaInitSucceeded)

    return client
  } catch (error: unknown) {
    logger.error(LoggerMessage.PrismaInitFailed, { error })

    throw error
  }
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Singleton prisma client pattern
// See more: https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
