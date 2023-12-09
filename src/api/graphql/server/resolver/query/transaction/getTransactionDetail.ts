import { QueryResolvers } from "@/api/graphql";

export const getTransactionDetail: QueryResolvers['getTransactionDetail'] = async (
  _, { transactionId }, { dataSources: { prisma } }
) => {
  const transaction = await prisma.transaction.readOne({ id: transactionId })

  if (transaction == null) {
    throw new Error('Not found')
  }

  const { entries, ...transactionProps } = transaction

  return {
    ...transactionProps,
    entries,
    amount: entries.reduce((accu, { debit: amount }) => accu + amount, 0),
    status: entries.some(({ status }) => status === 'PENDING') ? 'PENDING' : 'COMPLETED',
    count: entries.length
  }
}
