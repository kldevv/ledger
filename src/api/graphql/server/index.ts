import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "./resolver";
import { NextApiRequest } from "next";
import { ApolloServerContext } from "./context";
import { PrismaDataSource } from "@/db/prisma";
import { DateTimeResolver } from "graphql-scalars";
import { loadFilesSync } from "@graphql-tools/load-files";

const typeDefs = loadFilesSync("src/api/graphql/schema/**/*.gql");

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers: {
    ...resolvers,
    // Serialize JS date to transmit
    DateTime: DateTimeResolver
  },
});

export default startServerAndCreateNextHandler<NextApiRequest, ApolloServerContext>(server, {
  context: async (req, res) => ({ req, res, dataSources: {
      prisma: new PrismaDataSource()
    }
  }),
})
