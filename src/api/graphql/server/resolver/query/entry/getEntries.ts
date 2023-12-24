import { QueryResolvers } from "@/api/graphql";

export const getEntries: QueryResolvers['getEntries'] = async (
  _, { input: { vaultId, transactionId, accountId, categoryId } }, { dataSources: { prisma } }
) => {
  return await prisma.entry.readMany({ vaultId: vaultId ?? undefined, transactionId: transactionId ?? undefined, accountId: accountId ?? undefined, categoryId: categoryId ?? undefined })
}
