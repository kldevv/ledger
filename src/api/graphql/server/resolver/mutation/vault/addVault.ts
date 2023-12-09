import { MutationResolvers } from "@/api/graphql";

export const addVault: MutationResolvers['addVault'] = async (
  _, { input }, { dataSources: { prisma }}
) => {
  const vault = (await prisma.vault.createOne(input))

  return vault
}