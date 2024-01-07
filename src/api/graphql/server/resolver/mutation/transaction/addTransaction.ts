import type { MutationResolvers } from '@/api/graphql'

export const addTransaction: MutationResolvers['addTransaction'] = async (
  _,
  { input },
  { dataSources: { prisma } },
) => {
  const transaction = await prisma.transaction.createOne({
    ...input,
    entries: input.entries.map(({ debit, credit, ...rest }) => ({
      ...rest,
      amount: debit > 0 ? debit : -credit,
      vaultId: input.vaultId,
    })),
  })

  return {
    ...transaction,
    entries: transaction.entries.map(({ amount, ...rest }) => ({
      ...rest,
      debit: Math.max(0, amount),
      credit: -Math.min(0, amount),
    })),
  }
}
