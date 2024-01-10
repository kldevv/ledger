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

export interface ReportByQuarterTableProps {
  /**
   * Report data mappings
   */
  reportDataMappings: Map<string, ReportData>
  /**
   * Table variant
   */
  variant: DataVariant
}

export const ReportByQuarterTable: React.FC<ReportByQuarterTableProps> = ({
  reportDataMappings,
  variant,
}) => {
  const { t } = useTranslation('report')

  const colDefs = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => {
        const quarter = index + 1

        return columnHelper.group({
          id: String(quarter),
          header: () => (
            <span className="text-light-accent font-semibold">
              {t(`ReportByQuarterTable.header.${quarter}`)}
            </span>
          ),
          columns:
            variant === DataVariant.BREAKDOWN
              ? [
                  columnHelper.accessor('id', {
                    header: t`ReportByQuarterTable.header.subheader.debit`,
                    id: `${quarter}.debit`,
                    cell: ({ getValue, row }) => (
                      <FormattedNumber
                        className={row.depth < 2 ? 'border-b' : undefined}
                        value={
                          reportDataMappings.get(`${getValue()}::${quarter}`)
                            ?.debit ?? 0
                        }
                      />
                    ),
                  }),
                  columnHelper.accessor('id', {
                    header: t`ReportByQuarterTable.header.subheader.credit`,
                    id: `${quarter}.credit`,
                    cell: ({ getValue, row }) => (
                      <FormattedNumber
                        className={row.depth < 2 ? 'border-b' : undefined}
                        value={
                          reportDataMappings.get(`${getValue()}::${quarter}`)
                            ?.credit ?? 0
                        }
                      />
                    ),
                  }),
                ]
              : variant === DataVariant.NET
                ? [
                    columnHelper.accessor('id', {
                      header: t`ReportByQuarterTable.header.subheader.amount`,
                      id: `${quarter}.debit`,
                      cell: ({ getValue, row }) => {
                        const reportData = reportDataMappings.get(
                          `${getValue()}::${quarter}`,
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
                      header: t`ReportByQuarterTable.header.subheader.count`,
                      id: `${quarter}.debit`,
                      cell: ({ getValue, row }) => (
                        <div
                          className={classNames(
                            'text-right',
                            row.depth < 2 ? 'border-b' : undefined,
                          )}
                        >
                          {reportDataMappings.get(`${getValue()}::${quarter}`)
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
