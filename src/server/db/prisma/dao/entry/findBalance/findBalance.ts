import { Prisma, type EntryStatus } from '@prisma/client'

import { parsePrismaError } from '@/server/db/prisma'
import prisma from '@/server/db/prisma/client'
import logger from '@/server/logger'

export type FindBalanceProps = {
  /**
   * Treasury book id
   */
  treasuryBookId: string
  /**
   * Status
   */
  status?: EntryStatus
}

export type Balance = {
  /**
   * Account id
   */
  id: string
  /**
   * Account name
   */
  name: string
  /**
   * Balance
   */
  balance: number
}

export const findBalance = async (props: FindBalanceProps) => {
  try {
    return await prisma.$queryRaw<Balance[]>`
      SELECT
        a.id AS id,
        a.name AS name,
        SUM(e.amount) AS balance
      FROM
        entries e
      JOIN
        accounts a on a.id = e.account_id
      WHERE
        e.treasury_book_id = ${props.treasuryBookId}
        ${
          props.status != null
            ? Prisma.sql`AND e.status = ${props.status}::entry_status`
            : Prisma.empty
        }
      GROUP BY
        a.id, a.name;
    `
  } catch (e) {
    logger.log({
      level: 'info',
      message: 'Error in Entry DAO: findBalance',
      error: parsePrismaError(e),
      args: props,
    })

    throw e
  }
}
