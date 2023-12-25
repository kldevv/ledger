import { MutationResolvers } from "@/api/graphql";

export const updateCategory: MutationResolvers['updateCategory'] = async (
  _, { input }, { dataSources: { prisma } }
) => {
  return await prisma.category.updateOne({
    id: input.id,
    data: input
  })
}