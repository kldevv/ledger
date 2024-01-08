import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { loadFilesSync } from '@graphql-tools/load-files'
import { DateTimeResolver } from 'graphql-scalars'

import { PrismaDataSource } from '@/server/db/prisma'
import { StaticDataSource } from '@/server/db/static'

import { resolvers } from './resolver'

import type { ApolloServerContext } from './context'
import type { NextApiRequest } from 'next'

const typeDefs = loadFilesSync('src/api/graphql/schema/**/*.gql')

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers: {
    ...resolvers,
    // Serialize JS date to transmit
    DateTime: DateTimeResolver,
  },
})

export default startServerAndCreateNextHandler<
  NextApiRequest,
  ApolloServerContext
>(server, {
  context: async (req, res) =>
    Promise.resolve({
      req,
      res,
      dataSources: {
        prisma: new PrismaDataSource(),
        static: new StaticDataSource(),
      },
    }),
})
