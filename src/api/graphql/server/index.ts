import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import resolvers from "./resolver";
import { NextApiRequest, NextApiResponse } from "next";

const typeDefs = readFileSync("@/api/graphql/server/schema/schema.gql", { encoding: "utf-8" });

const server = new ApolloServer<{ req: NextApiRequest, res: NextApiResponse }>({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler<NextApiRequest, { req: NextApiRequest, res: NextApiResponse }>(server, {
  context: async (req, res) => ({ req, res }),
})