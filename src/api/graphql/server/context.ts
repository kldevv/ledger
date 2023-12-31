import type { PrismaDataSource } from '@/db/prisma'
import type { StaticDataSource } from '@/db/static'
import type { BaseContext } from '@apollo/server'
import type { NextApiRequest, NextApiResponse } from 'next'

export type DataSources = {
  prisma: PrismaDataSource
  static: StaticDataSource
}

export interface ApolloServerContext extends BaseContext {
  /**
   * Next api response object
   */
  res: NextApiResponse
  /**
   * Next api request object
   */
  req: NextApiRequest
  /**
   * Data sources
   */
  dataSources: DataSources
}
