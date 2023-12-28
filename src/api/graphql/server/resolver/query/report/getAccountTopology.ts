import { QueryResolvers } from "@/api/graphql";
import { CategoryType } from "@prisma/client";

export const getAccountTopology: QueryResolvers['getAccountTopology'] = async (
  _, { input: { vaultId } }, { dataSources: { prisma } }
) => {
  const accounts = await prisma.account.readMany({ vaultId })
  const categories = await prisma.category.readMany({ vaultId })

  return Object.keys(CategoryType).map((type) => ({
    id: type,
    name: type,
    // populate categories
    children: categories.filter((category) => category.type == type).map((category) => ({
      id: category.id,
      name: category.name,
      // populate accounts
      children: accounts.filter((account) => account.categoryId == category.id).map((account) => ({
        id: account.id,
        name: account.name,
        // account has no children
        children: []
      }))
    }))
  }))
}
