import { MutationResolvers } from "@/api/graphql";

export const addTransaction: MutationResolvers['addTransaction'] = async (
  _, { input }, { dataSources: { prisma } }
) => {
  return await prisma.transaction.createOne({
    ...input,
    entries: input.entries.map((entry) => ({
      ...entry,
      vaultId: input.vaultId,
    }))
  })
}