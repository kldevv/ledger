import { QueryResolvers } from "@/api/graphql";

export const getAllWallets: QueryResolvers['getAllWallets'] = async (
  _, { ownerId }, { dataSources: { prisma } }
) => {
  return await prisma.wallet.readMany({ ownerId })
}
