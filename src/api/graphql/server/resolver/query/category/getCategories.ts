import { QueryResolvers } from "@/api/graphql";

export const getCategories: QueryResolvers['getCategories'] = async (
  _, { input: { vaultId } }, { dataSources: { prisma } }
) => {
  return await prisma.category.readMany({ vaultId })
}
