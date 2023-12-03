import { Resolvers } from "@/api/graphql/_codegen/schema";
import Query from "./query";
import Mutation from "./mutation";

const resolvers: Resolvers = { Query, Mutation };

export default resolvers;