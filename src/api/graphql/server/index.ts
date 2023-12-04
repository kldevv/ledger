import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "./resolver";
import { NextApiRequest } from "next";
import { ApolloServerContext } from "./context";
import { PrismaDataSource } from "@/db/prisma";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"

const typeDefs = loadSchemaSync("src/api/graphql/schema/**/*.gql", {
  loaders: [new GraphQLFileLoader()]
});

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler<NextApiRequest, ApolloServerContext>(server, {
  context: async (req, res) => ({ req, res, dataSources: {
      prisma: new PrismaDataSource()
    }
  }),
})