import type { QueryResolvers } from '@/api/graphql'

export const accounts: QueryResolvers['accounts'] = async (
  _,
  { input: { treasuryBookId, categoryId } },
  { dataSources: { prisma } },
) => {
  const accounts = await prisma.account.readMany({
    treasuryBookId: treasuryBookId,
    categoryId: categoryId ?? undefined,
  })

  return accounts.map(({ _count, ...account }) => ({
    ...account,
    entryCount: _count.entries,
  }))
}
