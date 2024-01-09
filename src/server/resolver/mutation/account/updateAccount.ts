import type { MutationResolvers } from '@/api/graphql'

export const updateAccount: MutationResolvers['updateAccount'] = async (
  _,
  { input: { id, ...data } },
  { dataSources: { prisma } },
) => {
  return await prisma.account.updateOne({
    id,
    data,
  })
}
