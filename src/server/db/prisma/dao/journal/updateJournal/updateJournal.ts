import prisma from '../../../client'

import type { EntryStatus } from '@prisma/client'

export interface UpdateJournallArgs {
  /**
   * Id
   */
  id: string
  /**
   * Accrual date
   */
  accrualDate: Date
  /**
   * Note
   */
  note: string
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
  entries: UpdateJournallEntry[]
}

export type UpdateJournallEntry = {
  /**
   * Id
   */
  id?: string | null
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
  /**
   * Created at
   */
  createdAt?: Date | null
}

export const updateJournal = async ({
  id,
  accrualDate,
  note,
  tags,
  links,
  entries,
}: UpdateJournallArgs) => {
  return await prisma.journal.update({
    where: {
      id,
    },
    data: {
      accrualDate,
      note,
      tags: {
        connect: tags.map((id) => ({ id })),
      },
      links: {
        connect: links.map((id) => ({ id })),
      },
      entries: {
        deleteMany: {},
        createMany: {
          data: entries.map(
            ({
              memo,
              transactionDate,
              amount,
              accountId,
              status,
              branchId,
              createdAt,
              id,
            }) => ({
              memo,
              transactionDate,
              amount,
              accountId,
              status,
              branchId,
              createdAt: createdAt ?? undefined,
              id: id ?? undefined,
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
      branch: {
        select: {
          currency: true,
        },
      },
    },
  })
}
