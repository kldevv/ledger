import { Prisma } from '@prisma/client'

import { DateStandard, AccountingElement } from '@/api/graphql'
import prisma from '@/server/db/prisma/client'

import type { EntryStatus } from '@prisma/client'

export type FindTotalOverMonthsArgs = {
  /**
   * Branch id
   */
  branchId: string
  /**
   * Date standard
   */
  standard: DateStandard
  /**
   * Group by element
   */
  groupByElement: AccountingElement
  /**
   * Filter by year
   */
  year?: number | null
  /**
   * Filter by entry status
   */
  status?: EntryStatus | null
}

export type FindTotalOverMonthsReturns = {
  /**
   * ID
   */
  _id: string
  /**
   * Name
   */
  _name: string
  /**
   * Month
   */
  month: number
  /**
   * Total debit
   */
  debit: number
  /**
   * Total credit
   */
  credit: number
}[]

export const findTotalOverMonths = async ({
  branchId,
  standard,
  groupByElement,
  year,
  status,
}: FindTotalOverMonthsArgs) => {
  return await prisma.$queryRaw<FindTotalOverMonthsReturns>`
      SELECT
        SUM(CASE WHEN e.amount > 0 THEN e.amount ELSE 0 END) as debit,
        SUM(CASE WHEN e.amount < 0 THEN -e.amount ELSE 0 END) as credit,
        ${createMonthSql(standard)},
        ${createSelectElementAttributes(groupByElement)}
      FROM 
        entries e
      JOIN 
        accounts a ON a.id = e.account_id
      ${createJoinAccountGroupsTableStatement(groupByElement)}
      ${createJoinJournalsTableStatement(standard)}
      WHERE
        e.branch_id = ${branchId}
        ${createAndYearFilterSql(standard, year)}
        ${createAndStatusFilterSql(status)}
      GROUP BY
        month, _id, _name
      ORDER BY
        _name, month;
    `
}

const createMonthSql = (standard: DateStandard) => {
  return standard === DateStandard.TRANSACTION
    ? Prisma.sql`EXTRACT(MONTH FROM e.transaction_date) as month`
    : Prisma.sql`EXTRACT(MONTH FROM t.accrual_date) as month`
}

const createSelectElementAttributes = (element: AccountingElement) => {
  switch (element) {
    case AccountingElement.ACCOUNT:
      return Prisma.sql`
        a.id as _id,
        a.name as _name
      `
    case AccountingElement.ACCOUNT_GROUP:
      return Prisma.sql`
        c.id as _id,
        c.name as _name
      `
    default:
      return Prisma.sql`
        c.type as _id,
        c.type as _name
      `
  }
}

const createJoinAccountGroupsTableStatement = (element: AccountingElement) => {
  switch (element) {
    case AccountingElement.ACCOUNT_GROUP:
    case AccountingElement.ACCOUNTING_TYPE:
      return Prisma.sql`JOIN account_groups c ON c.id = a.account_group_id`
    default:
      return Prisma.empty
  }
}

const createJoinJournalsTableStatement = (standard: DateStandard) => {
  return standard === DateStandard.ACCRUAL
    ? Prisma.sql`JOIN journals t ON t.id = e.journal_id`
    : Prisma.empty
}

const createAndYearFilterSql = (
  standard: DateStandard,
  year?: number | null,
) => {
  if (year == null) return Prisma.empty

  return standard === DateStandard.TRANSACTION
    ? Prisma.sql`AND EXTRACT(YEAR FROM e.transaction_date) = ${year}`
    : Prisma.sql`AND EXTRACT(YEAR FROM t.accrual_date) = ${year}`
}

const createAndStatusFilterSql = (status?: EntryStatus | null) => {
  return status != null
    ? Prisma.sql`AND e.status = ${status}::entry_status`
    : Prisma.empty
}
