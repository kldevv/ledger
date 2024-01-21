import { Prisma } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

import type { Category, Entry, EntryStatus } from '@prisma/client'

export type GroupByCategoryTypeProps = Pick<Entry, 'vaultId'> & {
  /**
   * Filter by year
   */
  year?: number
  /**
   * Filter by entry status
   */
  status?: EntryStatus
}

export type GroupByCategoryTypeReturns = Array<{
  /**
   * Category type
   */
  id: Category['type']
  /**
   * Category type
   */
  name: Category['type']
  /**
   * Total debit
   */
  debit: number
  /**
   * Total credit
   */
  credit: number
}>

export const groupByCategoryType = async ({
  vaultId,
  year,
  status,
}: GroupByCategoryTypeProps) => {
  try {
    return await prisma.$queryRaw<GroupByCategoryTypeReturns>`
      SELECT
        SUM(CASE WHEN e."amount" > 0 THEN e."amount" ELSE 0 END) as "debit",
        SUM(CASE WHEN e."amount" < 0 THEN -e."amount" ELSE 0 END) as "credit",
        c."type" as "id",
        c."type" as "name"
      FROM
        "Entry" e
      JOIN
        "Account" a on a."id" = e."accountId"
      JOIN
        "Category" c on c."id" = a."categoryId"
      WHERE
        e."vaultId" = ${vaultId}
        ${
          year != null
            ? Prisma.sql`AND EXTRACT(YEAR FROM e."transactionDate") = ${year}`
            : Prisma.empty
        }
        ${
          status != null
            ? Prisma.sql`AND e.status = ${status}::"EntryStatus"`
            : Prisma.empty
        }
      GROUP BY
        c."type";
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: groupByCategoryType',
      error: parsePrismaError(e),
    })

    throw e
  }
}
