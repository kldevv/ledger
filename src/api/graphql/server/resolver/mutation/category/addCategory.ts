import { MutationResolvers } from "@/api/graphql";

export const addCategory: MutationResolvers['addCategory'] = async (
  _, { input }, { dataSources: { prisma } }
) => {
  return await prisma.category.createOne(input)
}