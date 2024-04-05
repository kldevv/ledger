import prisma from '@/server/db/prisma/client'

import type { Account, Category, Entry } from '@prisma/client'

export type FindEntriesProps = Partial<
  Pick<Entry, 'accountId' | 'status' | 'transactionId' | 'treasuryBookId'> &
    Pick<Account, 'categoryId'> &
    Pick<Category, 'type'>
>

export const findEntries = async ({
  categoryId,
  type,
  ...props
}: FindEntriesProps) => {
  return await prisma.entry.findMany({
    where: {
      ...props,
      account: {
        categoryId,
        category: {
          type,
        },
      },
    },
    include: {
      account: {
        include: {
          category: true,
        },
      },
    },
  })
}
