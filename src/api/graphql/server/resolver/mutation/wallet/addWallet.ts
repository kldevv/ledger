import { MutationResolvers } from "@/api/graphql";

export const addWallet: MutationResolvers['addWallet'] = async (
  _, { input }, { dataSources: { prisma }}
) => {
  return await prisma.walletDS.createOne(input)
}