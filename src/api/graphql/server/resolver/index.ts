import { Resolvers } from "@/api/graphql";
import * as Query from "./query";
import * as Mutation from "./mutation";

export const resolvers: Resolvers = { Query, Mutation };