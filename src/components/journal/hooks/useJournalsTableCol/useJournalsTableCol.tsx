import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'

import {
  EntryStatusChip,
  FormattedCurrencyNumber,
  FormattedDate,
  TextLink,
} from '@/components/core/presentationals'
import { route } from '@/shared/route'

import type { JournalsQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<JournalsQuery['journals'][number]>()

export const useJournalsTableCol = () => {
  const { t } = useTranslation('journal')

  return [
    columnHelper.accessor('accrualDate', {
      header: t('journalsTable.col.date'),
      cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
    }),
    columnHelper.accessor(({ id, note }) => ({ id, note }), {
      header: t('journalsTable.col.note'),
      cell: ({ getValue }) => (
        <TextLink
          intent="table"
          href={{
            pathname: route.journal.details.pathname,
            query: { id: getValue().id },
          }}
        >
          {getValue().note}
        </TextLink>
      ),
    }),
    columnHelper.accessor('status', {
      header: t('journalsTable.col.status'),
      cell: ({ getValue }) => <EntryStatusChip status={getValue()} />,
    }),
    columnHelper.accessor('amount', {
      header: t`journalsTable.col.amount`,
      cell: ({ getValue }) => <FormattedCurrencyNumber value={getValue()} />,
    }),
    columnHelper.accessor('createdAt', {
      header: t`journalsTable.col.createdAt`,
      cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
    }),
    columnHelper.accessor('id', {
      header: t`journalsTable.col.details`,
      enableSorting: false,
      cell: ({ getValue }) => (
        <TextLink
          href={{
            pathname: route.journal.details.pathname,
            query: { id: getValue() },
          }}
        >{t`journalsTable.view`}</TextLink>
      ),
    }),
  ]
}
