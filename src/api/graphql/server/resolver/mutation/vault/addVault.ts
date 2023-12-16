import { MutationResolvers } from "@/api/graphql";

export const addVault: MutationResolvers['addVault'] = async (
  _, { input }, { dataSources: { prisma }}
) => {
  return await prisma.vault.createOne(input)
}