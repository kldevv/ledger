import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import {
  Button,
  CurrencyChip,
  FormattedDate,
  Table,
  LinkButton,
} from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'
import { route } from '@/shared'

import type { TreasuryBooksQuery } from '@/api/graphql'

export type TreasuryBookTableData = TreasuryBooksQuery['treasuryBooks'][number]

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
  const { t } = useTranslation('branch')
  const [currentBranch, setCurrentBranch] = useCurrentBranch()

  const createHandleOnTreasuryBookSwitch = useCallback(
    (id: string) => () =>
      setCurrentBranch(data.find((branch) => branch.id === id)),
    [currentBranch?.id],
  )

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '',
        id: 'is-selected',
        cell: ({ getValue }) =>
          getValue() === currentBranch?.id ? (
            <CheckCircleIcon className="text-light-accent size-5" />
          ) : null,
      }),
      columnHelper.accessor('id', {
        header: '',
        id: 'select',
        cell: ({ getValue }) => (
          <Button
            onClick={createHandleOnTreasuryBookSwitch(getValue())}
            className="text-light-accent border-light-accent hover:bg-light-accent-halo rounded-md border px-1 text-xs font-medium leading-6"
          >
            {t`TreasuryBookTable.button.select`}
          </Button>
        ),
      }),
      columnHelper.accessor(
        ({ id, name }) => ({
          id,
          name,
        }),
        {
          header: t`TreasuryBookTable.header.name`,
          cell: ({ getValue }) => (
            <Link
              href={{
                pathname: route.branch.details.pathname,
                query: {
                  id: getValue().id,
                },
              }}
              className="text-dark-shades hover:text-light-accent flex items-center"
            >
              {getValue().name}
            </Link>
          ),
        },
      ),
      columnHelper.accessor('currency', {
        header: t`TreasuryBookTable.header.currency`,
        cell: ({ getValue }) => <CurrencyChip currency={getValue()} />,
      }),
      columnHelper.accessor('createdAt', {
        header: t`TreasuryBookTable.header.createdAt`,
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.accessor('id', {
        header: '',
        cell: ({ getValue }) => (
          <LinkButton
            href={{
              pathname: route.branch.details.pathname,
              query: {
                id: getValue(),
              },
            }}
            label={t`TreasuryBookTable.link.view`}
          />
        ),
      }),
    ],
    [createHandleOnTreasuryBookSwitch, currentBranch?.id, t],
  )

  return <Table data={data} colDefs={colDefs} />
}
