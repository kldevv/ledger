import type { QueryResolvers } from '@/api/graphql'

export const getAccounts: QueryResolvers['getAccounts'] = async (
  _,
  { input: { treasuryBookId, categoryId } },
  { dataSources: { prisma } },
) => {
  return await prisma.account.readMany({
    treasuryBookId: treasuryBookId,
    categoryId: categoryId ?? undefined,
  })
}
