import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { loadFilesSync } from '@graphql-tools/load-files'
import { DateTimeResolver } from 'graphql-scalars'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/api/auth'
import logger from '@/server/logger'
import { resolvers } from '@/server/resolver'

import type { ApolloServerContext } from './context'
import type { NextApiRequest } from 'next'

const typeDefs = loadFilesSync('src/api/graphql/schema/**/*.gql')

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  logger,
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
  context: async (req, res) => {
    const session = await getServerSession(req, res, authOptions)

    return {
      req,
      res,
      session,
    }
  },
})
