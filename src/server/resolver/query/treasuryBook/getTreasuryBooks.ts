import type { QueryResolvers } from '@/api/graphql'

export const getTreasuryBooks: QueryResolvers['getTreasuryBooks'] = async (
  _,
  { input: { ownerId, currency } },
  { dataSources: { prisma } },
) => {
  return await prisma.vault.readMany({
    ownerId,
    currency: currency ?? undefined,
  })
}
