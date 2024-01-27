import type { QueryResolvers } from '@/api/graphql'

export const getTags: QueryResolvers['getTags'] = async (
  _,
  { input: { treasuryBookId } },
  { dataSources: { prisma } },
) => {
  return await prisma.tag.readMany({ treasuryBookId })
}
