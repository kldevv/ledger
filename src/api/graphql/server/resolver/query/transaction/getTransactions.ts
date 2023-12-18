import { QueryResolvers } from "@/api/graphql";

export const getTransactions: QueryResolvers['getTransactions'] = async (
  _, { input: { vaultId, tagId } }, { dataSources: { prisma } }
) => {
  return await prisma.transaction.readMany({ vaultId, tagId: tagId ?? undefined })
}
