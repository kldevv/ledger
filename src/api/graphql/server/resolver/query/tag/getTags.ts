import { QueryResolvers } from "@/api/graphql";

export const getEntries: QueryResolvers['getTags'] = async (
  _, { input: { vaultId } }, { dataSources: { prisma } }
) => {
  return await prisma.tag.readMany({ vaultId })
}
