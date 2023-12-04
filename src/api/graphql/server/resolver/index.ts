import { Resolvers } from "@/api/graphql";
import Query from "./query";
import Mutation from "./mutation";

export const resolvers: Resolvers = { Query, Mutation };