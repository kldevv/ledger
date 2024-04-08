import prisma from '@/server/db/prisma/client'

import type { EntryStatus } from '@prisma/client'

export interface CreateJournalArgs {
  /**
   * Accrual date
   */
  accrualDate: Date
  /**
   * Note
   */
  note: string
  /**
   * Branch id
   */
  branchId: string
  /**
   * Id of the associated tags
   */
  tags: string[]
  /**
   * Id of the associated links
   */
  links: string[]
  /**
   * Entries
   */
  entries: CreateJournalEntry[]
}

export type CreateJournalEntry = {
  /**
   * Memo
   */
  memo: string
  /**
   * Transaction date
   */
  transactionDate: Date
  /**
   * Amount
   */
  amount: number
  /**
   * Status
   */
  status: EntryStatus
  /**
   * Account id
   */
  accountId: string
  /**
   * Branch id
   */
  branchId: string
}

export const createJournal = async ({
  accrualDate,
  note,
  branchId,
  tags,
  links,
  entries,
}: CreateJournalArgs) => {
  return await prisma.transaction.create({
    data: {
      accrualDate,
      note,
      treasuryBookId: branchId,
      tags: {
        connect: tags.map((id) => ({ id })),
      },
      links: {
        connect: links.map((id) => ({ id })),
      },
      entries: {
        createMany: {
          data: entries.map(
            ({
              memo,
              transactionDate,
              amount,
              accountId,
              status,
              branchId,
            }) => ({
              memo,
              transactionDate,
              amount,
              accountId,
              status,
              treasuryBookId: branchId,
            }),
          ),
        },
      },
    },
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      links: {
        select: {
          id: true,
          name: true,
        },
      },
      entries: {
        select: {
          amount: true,
          status: true,
        },
      },
      treasuryBook: {
        select: {
          currency: true,
        },
      },
    },
  })
}
