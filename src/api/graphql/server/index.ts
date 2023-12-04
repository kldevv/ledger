import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import { resolvers } from "./resolver";
import { NextApiRequest } from "next";
import { ApolloServerContext } from "./context";

const typeDefs = readFileSync("src/api/graphql/schema/schema.gql", { encoding: "utf-8" });

const server = new ApolloServer<ApolloServerContext>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler<NextApiRequest, ApolloServerContext>(server, {
  context: async (req, res) => ({ req, res }),
})