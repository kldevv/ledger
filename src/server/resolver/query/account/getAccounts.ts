import type { QueryResolvers } from '@/api/graphql'

export const getAccounts: QueryResolvers['getAccounts'] = async (
  _,
  { input: { vaultId, categoryId } },
  { dataSources: { prisma } },
) => {
  return await prisma.account.readMany({
    vaultId: vaultId ?? undefined,
    categoryId: categoryId ?? undefined,
  })
}
