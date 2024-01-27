import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { Button, CurrencyChip, FormattedDate, Table } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import type { GetTreasuryBooksQuery } from '@/api/graphql'

export type TreasuryBookTableData =
  GetTreasuryBooksQuery['getTreasuryBooks'][number]

const columnHelper = createColumnHelper<TreasuryBookTableData>()

export interface TreasuryBookTableProps {
  /**
   * Data
   */
  data: TreasuryBookTableData[]
}

export const TreasuryBookTable: React.FC<TreasuryBookTableProps> = ({
  data,
}) => {
  const { t } = useTranslation('vault')
  const { selectedTreasuryBookId, setSelectedTreasuryBookId } =
    useTreasuryBookContext()

  const createHandleOnVaultSwitch = useCallback(
    (id: string) => {
      return () => setSelectedTreasuryBookId?.(id)
    },
    [setSelectedTreasuryBookId],
  )

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t`TreasuryBookTable.header.id`,
        cell: ({ getValue }) => (
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-[7rem]">
            {getValue()}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'is-selected',
        cell: ({ row }) =>
          row.getValue('id') === selectedTreasuryBookId ? (
            <CheckCircleIcon className="w-5 h-5 text-light-accent" />
          ) : null,
      }),
      columnHelper.accessor('name', {
        header: t`TreasuryBookTable.header.name`,
        cell: ({ getValue }) => (
          <div className="text-dark-shades">{getValue()}</div>
        ),
      }),
      columnHelper.accessor('currency', {
        header: t`TreasuryBookTable.header.currency`,
        cell: ({ getValue }) => <CurrencyChip currency={getValue()} />,
      }),
      columnHelper.accessor('createdAt', {
        header: t`TreasuryBookTable.header.createdAt`,
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.accessor('updatedAt', {
        header: t`TreasuryBookTable.header.updatedAt`,
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.display({
        id: 'select-vault',
        cell: (props) => (
          <Button
            onClick={createHandleOnVaultSwitch(props.row.getValue('id'))}
            className="text-light-accent"
          >
            {t('TreasuryBookTable.button.switch')}
          </Button>
        ),
      }),
    ],
    [createHandleOnVaultSwitch, selectedTreasuryBookId, t],
  )

  return <Table data={data} colDefs={colDefs} />
}
