import type { QueryResolvers } from '@/api/graphql'

export const getTags: QueryResolvers['getTags'] = async (
  _,
  { input: { vaultId } },
  { dataSources: { prisma } },
) => {
  return await prisma.tag.readMany({ vaultId })
}
