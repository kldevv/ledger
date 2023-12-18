import { QueryResolvers } from "@/api/graphql";

export const getCategory: QueryResolvers['getCategory'] = async (
  _, { input }, { dataSources: { prisma } }
) => {
  return await prisma.category.readOne(input)
}
