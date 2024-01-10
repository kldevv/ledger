import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedNumber } from '@/components/common'
import {
  AccountTopologyTable,
  DataVariant,
  columnHelper,
} from '@/components/report'

import type { ReportData } from '@/api/graphql'

export interface ReportByMonthTableProps {
  /**
   * Report data mappings
   */
  reportDataMappings: Map<string, ReportData>
  /**
   * Table variant
   */
  variant: DataVariant
}

export const ReportByMonthTable: React.FC<ReportByMonthTableProps> = ({
  reportDataMappings,
  variant,
}) => {
  const { t } = useTranslation('report')

  const colDefs = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => {
        const month = index + 1

        return columnHelper.group({
          id: String(month),
          header: () => (
            <span className="text-light-accent font-semibold">
              {t(`ReportByMonthTable.header.${month}`)}
            </span>
          ),
          columns:
            variant === DataVariant.BREAKDOWN
              ? [
                  columnHelper.accessor('id', {
                    header: t`ReportByMonthTable.header.subheader.debit`,
                    id: `${month}.debit`,
                    cell: ({ getValue, row }) => (
                      <FormattedNumber
                        className={row.depth < 2 ? 'border-b' : undefined}
                        value={
                          reportDataMappings.get(`${getValue()}::${month}`)
                            ?.debit ?? 0
                        }
                      />
                    ),
                  }),
                  columnHelper.accessor('id', {
                    header: t`ReportByMonthTable.header.subheader.credit`,
                    id: `${month}.credit`,
                    cell: ({ getValue, row }) => (
                      <FormattedNumber
                        className={row.depth < 2 ? 'border-b' : undefined}
                        value={
                          reportDataMappings.get(`${getValue()}::${month}`)
                            ?.credit ?? 0
                        }
                      />
                    ),
                  }),
                ]
              : variant === DataVariant.NET
                ? [
                    columnHelper.accessor('id', {
                      header: t`ReportByMonthTable.header.subheader.amount`,
                      id: `${month}.debit`,
                      cell: ({ getValue, row }) => {
                        const reportData = reportDataMappings.get(
                          `${getValue()}::${month}`,
                        )

                        const debit = reportData?.debit ?? 0
                        const credit = reportData?.credit ?? 0

                        return (
                          <FormattedNumber
                            className={row.depth < 2 ? 'border-b' : undefined}
                            value={credit + debit}
                          />
                        )
                      },
                    }),
                  ]
                : [
                    columnHelper.accessor('id', {
                      header: t`ReportByMonthTable.header.subheader.count`,
                      id: `${month}.debit`,
                      cell: ({ getValue, row }) => (
                        <div
                          className={classNames(
                            'text-right',
                            row.depth < 2 ? 'border-b' : undefined,
                          )}
                        >
                          {reportDataMappings.get(`${getValue()}::${month}`)
                            ?.count ?? 0}
                        </div>
                      ),
                    }),
                  ],
        })
      }),
    [t, variant, reportDataMappings],
  )

  return (
    <AccountTopologyTable
      cols={colDefs}
      colGroupCount={variant === DataVariant.BREAKDOWN ? 2 : 1}
    />
  )
}
