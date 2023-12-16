import { QueryResolvers } from "@/api/graphql";

export const getVaults: QueryResolvers['getVaults'] = async (
  _, { input: { ownerId, currency } }, { dataSources: { prisma } }
) => {
  console.log(ownerId)

  return await prisma.vault.readMany({
    ownerId,
    currency: currency ?? undefined
  })
}
