import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useGetVaultsQuery } from '@/api/graphql'
import { Button, FormattedDate, Table } from '@/components/common'
import { useTreasuryBookContext } from '@/hooks'

import type { GetVaultsQuery } from '@/api/graphql'

export type VaultTableData = GetVaultsQuery['getVaults'][number]

const columnHelper = createColumnHelper<VaultTableData>()

export const VaultTable: React.FC = () => {
  const { t } = useTranslation('vault')
  const { selectedTreasuryBookId, setSelectedTreasuryBookId } =
    useTreasuryBookContext()

  const { data } = useGetVaultsQuery({
    variables: {
      input: {
        ownerId:
          process.env.PROFILE_ID ?? 'ce4a7c81-6404-4098-a763-64550c4ec902',
      },
    },
  })

  const createHandleOnVaultSwitch = useCallback(
    (id: string) => {
      return () => setSelectedTreasuryBookId?.(id)
    },
    [setSelectedTreasuryBookId],
  )

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t('VaultTable.header.id'),
        cell: (props) => (
          <div className="overflow-hidden overflow-ellipsis whitespace-nowrap w-[7rem]">
            {props.getValue()}
          </div>
        ),
      }),
      columnHelper.display({
        id: 'is-selected',
        cell: (props) =>
          props.row.getValue('id') === selectedTreasuryBookId ? (
            <CheckCircleIcon className="w-5 h-5 text-light-accent" />
          ) : null,
      }),
      columnHelper.accessor('name', {
        header: t('VaultTable.header.name'),
        cell: (props) => (
          <div className="text-dark-shades">{props.getValue()}</div>
        ),
      }),
      columnHelper.accessor('currency', {
        header: t('VaultTable.header.currency'),
      }),
      columnHelper.accessor('createdDate', {
        header: t('VaultTable.header.createdDate'),
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.accessor('updatedDate', {
        header: t('VaultTable.header.updatedDate'),
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.display({
        id: 'select-vault',
        cell: (props) => (
          <Button
            onClick={createHandleOnVaultSwitch(props.row.getValue('id'))}
            className="text-light-accent"
          >
            {t('VaultTable.button.switch')}
          </Button>
        ),
      }),
    ],
    [createHandleOnVaultSwitch, selectedTreasuryBookId, t],
  )

  return <Table data={data?.getVaults ?? []} colDefs={colDefs} />
}
