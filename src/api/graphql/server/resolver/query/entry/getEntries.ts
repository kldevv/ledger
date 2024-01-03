import { QueryResolvers } from "@/api/graphql";

export const getEntries: QueryResolvers['getEntries'] = async (
  _, { input: { vaultId, transactionId, accountId, categoryId } }, { dataSources: { prisma } }
) => {
  const entries = await prisma.entry.readMany({ vaultId: vaultId ?? undefined, transactionId: transactionId ?? undefined, accountId: accountId ?? undefined, categoryId: categoryId ?? undefined })

  return entries.map(({ amount, ...rest }) => ({
    ...rest,
    debit: Math.max(0, amount),
    credit: Math.min(0, amount)
  }))
}
