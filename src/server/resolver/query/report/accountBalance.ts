import { type QueryResolvers } from '@/api/graphql'

export const accountBalance: QueryResolvers['accountBalance'] = async (
  _,
  { input: { treasuryBookId, status } },
  { dataSources: { prisma } },
) => {
  return await prisma.entry.findBalance({
    treasuryBookId,
    status: status ?? undefined,
  })
}
