import { MutationResolvers } from "@/api/graphql";

export const updateAccount: MutationResolvers['updateAccount'] = async (
  _, { input }, { dataSources: { prisma } }
) => {
  return await prisma.account.updateOne({
    id: input.id,
    data: {
      ...input
    }
  })
}