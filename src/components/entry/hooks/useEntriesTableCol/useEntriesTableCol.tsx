import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useCurrentBranch } from '@/components/core/hooks'
import {
  TextLink,
  FormattedDate,
  FormattedCurrencyNumber,
  EntryStatusChip,
} from '@/components/core/presentationals'
import { route } from '@/shared/route'

import type { EntriesQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<EntriesQuery['entries'][number]>()

export const useEntriesTableCol = () => {
  const [currentBranch] = useCurrentBranch()
  const { t } = useTranslation('entry')

  return useMemo(
    () => [
      columnHelper.accessor('transactionDate', {
        header: t`entriesTable.col.transactionDate`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('debit', {
        header: t`entriesTable.col.debit`,
        cell: ({ getValue }) =>
          getValue() === 0 ? (
            '-'
          ) : currentBranch ? (
            <FormattedCurrencyNumber
              currency={currentBranch?.currency}
              value={getValue()}
            />
          ) : (
            getValue()
          ),
      }),
      columnHelper.accessor('credit', {
        header: t`entriesTable.col.credit`,
        cell: ({ getValue }) =>
          getValue() === 0 ? (
            '-'
          ) : currentBranch ? (
            <FormattedCurrencyNumber
              currency={currentBranch?.currency}
              value={getValue()}
            />
          ) : (
            getValue()
          ),
      }),
      columnHelper.accessor('account', {
        header: t`entriesTable.col.account`,
        cell: ({ getValue }) => (
          <TextLink
            intent="table"
            href={{
              pathname: route.account.details.pathname,
              query: { id: getValue().id },
            }}
          >
            {getValue().name}
          </TextLink>
        ),
      }),
      columnHelper.accessor('status', {
        header: t`entriesTable.col.status`,
        cell: ({ getValue }) => <EntryStatusChip status={getValue()} />,
      }),
      columnHelper.accessor('journal', {
        header: t`entriesTable.col.journal`,
        cell: ({ getValue }) => (
          <div className="flex flex-col">
            <TextLink
              intent="table"
              href={{
                pathname: route.journal.details.pathname,
                query: { id: getValue().id },
              }}
            >
              {getValue().note}
              <div className="text-gray hover:text-gray/50 text-xs font-normal">
                {getValue().id}
              </div>
            </TextLink>
          </div>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: t`entriesTable.col.createdAt`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('id', {
        header: t`entriesTable.col.details`,
        enableSorting: false,
        cell: ({ getValue }) => (
          <TextLink
            href={{
              pathname: route.entry.details.pathname,
              query: { id: getValue() },
            }}
          >
            {t`entriesTable.view`}
          </TextLink>
        ),
      }),
    ],
    [currentBranch, t],
  )
}
