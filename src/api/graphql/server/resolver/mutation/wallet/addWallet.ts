import { MutationResolvers } from "@/api/graphql";

export const addWallet: MutationResolvers['addWallet'] = async (
  _, { input }, { dataSources: { prisma }}
) => {
  const wallet = (await prisma.wallet.createOne(input))

  return wallet
}