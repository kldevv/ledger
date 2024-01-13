import classNames from 'classnames'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetMinMaxDateQuery } from '@/api/graphql'
import { FormattedNumber } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import { AccountTopologyTable, DataVariant, columnHelper } from '..'

import type { Basis, ReportData } from '@/api/graphql'

export interface ReportByYearTableProps {
  /**
   * Report data mappings
   */
  reportDataMappings: Map<string, ReportData>
  /**
   * Basis
   */
  basis: Basis
  /**
   * Table variant
   */
  variant: DataVariant
}

export const ReportByYearTable: React.FC<ReportByYearTableProps> = ({
  reportDataMappings,
  basis,
  variant,
}) => {
  const { t } = useTranslation('report')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data } = useGetMinMaxDateQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId ?? '',
        basis,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const [minYear, maxYear] = useMemo(() => {
    const dates = data?.getMinMaxDate

    const curYear = new Date().getFullYear()

    return [
      dates?.minDate?.getFullYear() ?? curYear,
      dates?.maxDate?.getFullYear() ?? curYear,
    ]
  }, [data])

  const colDefs = useMemo(
    () =>
      Array.from({ length: maxYear - minYear + 1 }).map((_, index) => {
        const year = minYear + index

        return columnHelper.group({
          id: String(year),
          header: () => (
            <span className="text-light-accent font-semibold">{year}</span>
          ),
          columns:
            variant === DataVariant.BREAKDOWN
              ? [
                  columnHelper.accessor('id', {
                    header: t`ReportByYearTable.header.subheader.debit`,
                    id: `${year}.debit`,
                    cell: ({ getValue, row }) => (
                      <FormattedNumber
                        className={row.depth < 2 ? 'border-b' : undefined}
                        value={
                          reportDataMappings.get(`${getValue()}::${year}`)
                            ?.debit ?? 0
                        }
                      />
                    ),
                  }),
                  columnHelper.accessor('id', {
                    header: t`ReportByYearTable.header.subheader.credit`,
                    id: `${year}.credit`,
                    cell: ({ getValue, row }) => (
                      <FormattedNumber
                        className={row.depth < 2 ? 'border-b' : undefined}
                        value={
                          reportDataMappings.get(`${getValue()}::${year}`)
                            ?.credit ?? 0
                        }
                      />
                    ),
                  }),
                ]
              : variant === DataVariant.NET
                ? [
                    columnHelper.accessor('id', {
                      header: t`ReportByYearTable.header.subheader.amount`,
                      id: `${year}.debit`,
                      cell: ({ getValue, row }) => {
                        const reportData = reportDataMappings.get(
                          `${getValue()}::${year}`,
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
                      header: t`ReportByYearTable.header.subheader.count`,
                      id: `${year}.debit`,
                      cell: ({ getValue, row }) => (
                        <div
                          className={classNames(
                            'text-right',
                            row.depth < 2 ? 'border-b' : undefined,
                          )}
                        >
                          {reportDataMappings.get(`${getValue()}::${year}`)
                            ?.count ?? 0}
                        </div>
                      ),
                    }),
                  ],
        })
      }),
    [maxYear, minYear, variant, t, reportDataMappings],
  )

  return (
    <AccountTopologyTable
      cols={colDefs}
      colGroupCount={variant === DataVariant.BREAKDOWN ? 2 : 1}
    />
  )
}
