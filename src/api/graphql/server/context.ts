import { PrismaDataSource } from "@/db/prisma";
import { BaseContext } from "@apollo/server";
import { NextApiRequest, NextApiResponse } from "next";

export type DataSources = {
  prisma: PrismaDataSource
}

export interface ApolloServerContext extends BaseContext{
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