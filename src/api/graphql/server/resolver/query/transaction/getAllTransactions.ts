import { QueryResolvers } from "@/api/graphql";

export const getAllTransactions: QueryResolvers['getAllTransactions'] = async (
  _, { vaultId }, { dataSources: { prisma } }
) => {
  const transactions = await prisma.transaction.readMany({ vaultId })

  return transactions.map(({ entries, ...transactionProps }) => ({
    ...transactionProps,
    entries,
    amount: entries.reduce((accu, { debit: amount }) => accu + amount, 0),
    status: entries.some(({ status }) => status === 'PENDING') ? 'PENDING' : 'COMPLETED',
    count: entries.length
  }))
}
