import { type QueryResolvers } from '@/api/graphql'

import type { Account, Category } from '@prisma/client'

export const accountBalance: QueryResolvers['accountBalance'] = async (
  _,
  { input: { treasuryBookId, status } },
  { dataSources: { prisma } },
) => {
  const balance = await prisma.entry.findAccountBalance({
    treasuryBookId,
    status: status ?? undefined,
  })
  const accounts = await prisma.account.findAccounts({
    treasuryBookId,
  })

  const accountMap = new Map<
    Account['id'],
    [Account['name'], Category['id'], Category['name'], Category['type']]
  >()

  accounts.map(({ category, id, name }) => {
    accountMap.set(id, [
      name,
      category.id,
      category.name,
      category.type,
    ] as const)
  })

  return balance.map(({ accountId, _sum: { amount } }) => {
    const account = accountMap.get(accountId)

    if (account == null) {
      throw Error
    }

    const [name, categoryId, categoryName, categoryType] = account

    return {
      account: {
        id: accountId,
        name: name,
      },
      category: {
        id: categoryId,
        name: categoryName,
      },
      type: categoryType,
      balance: amount ?? 0,
    }
  })
}
