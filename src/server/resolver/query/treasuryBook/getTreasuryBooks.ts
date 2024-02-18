import type { QueryResolvers } from '@/api/graphql'

export const treasuryBooks: QueryResolvers['treasuryBooks'] = async (
  _,
  { input: { ownerId, currency } },
  { dataSources: { prisma } },
) => {
  return await prisma.treasuryBook.readMany({
    ownerId,
    currency: currency ?? undefined,
  })
}
