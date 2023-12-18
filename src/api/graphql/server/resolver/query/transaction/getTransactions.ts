import { EntryStatus, QueryResolvers } from "@/api/graphql";

export const getTransactions: QueryResolvers['getTransactions'] = async (
  _, { input: { vaultId, tagId } }, { dataSources: { prisma } }
) => {
  const transactions = await prisma.transaction.readMany({ vaultId, tagId: tagId ?? undefined })

  return transactions.map((transaction) => ({
    ...transaction,
    status: transaction.entries?.some(({ status }) => status === EntryStatus.PENDING) ? EntryStatus.PENDING : EntryStatus.COMPLETED
  }))
}
