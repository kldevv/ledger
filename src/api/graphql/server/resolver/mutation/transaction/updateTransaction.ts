import { MutationResolvers } from "@/api/graphql";

export const updateTransaction: MutationResolvers['updateTransaction'] = async (
  _, { input }, { dataSources: { prisma } }
) => {
  return await prisma.transaction.updateOne({
    id: input.id,
    data: {
      ...input,
      entries: input.entries.map((entry) => ({
        ...entry,
        vaultId: input.vaultId,
      }))
    }
  })
}