import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from '@as-integrations/next'


import typeDefs from "@/server/lib/graphql/schema"
import resolvers from "@/server/resolver"

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: []
})

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res }),
})

export default handler