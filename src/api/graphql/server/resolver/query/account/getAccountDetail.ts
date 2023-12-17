import { QueryResolvers } from "@/api/graphql";

export const getAccountDetail: QueryResolvers['getAccountDetail'] = async (
  _, { accountId }, { dataSources: { prisma } }
) => {
  return await prisma.account.readOne({ id: accountId })
}
