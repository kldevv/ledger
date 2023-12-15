import { PrismaDataSource } from "@/db/prisma";
import { StaticDataSource } from "@/db/static";
import { BaseContext } from "@apollo/server";
import { NextApiRequest, NextApiResponse } from "next";

export type DataSources = {
  prisma: PrismaDataSource
  static: StaticDataSource
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