import { QueryResolvers } from "@/api/graphql";

export const getEntries: QueryResolvers['getEntries'] = async (
  _, { input: { vaultId } }, { dataSources: { prisma } }
) => {
  return await prisma.entry.readMany({ vaultId })
}
