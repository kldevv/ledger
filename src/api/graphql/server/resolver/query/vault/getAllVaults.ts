import { QueryResolvers } from "@/api/graphql";

export const getAllVaults: QueryResolvers['getAllVaults'] = async (
  _, { ownerId }, { dataSources: { prisma } }
) => {
  return await prisma.vault.readMany({ ownerId })
}
