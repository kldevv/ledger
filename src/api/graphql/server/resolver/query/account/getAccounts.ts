import { QueryResolvers } from "@/api/graphql";

export const getAccounts: QueryResolvers['getAccounts'] = async (
  _, { input: { vaultId } }, { dataSources: { prisma } }
) => {
  return await prisma.account.readMany({ vaultId })
}
