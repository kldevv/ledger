import { QueryResolvers } from "@/api/graphql";

export const getTags: QueryResolvers['getTags'] = async (
  _, { input: { vaultId } }, { dataSources: { prisma } }
) => {
  if (vaultId == null) {
    return []
  }

  return await prisma.tag.readMany({ vaultId })
}
