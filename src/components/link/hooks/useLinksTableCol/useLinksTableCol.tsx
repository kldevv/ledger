import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'

import { FormattedDate } from '@/components/core'
import { TextLink } from '@/components/core/presentationals'
import { route } from '@/shared'

import type { LinksQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<LinksQuery['links'][number]>()

export const useLinksTableCol = () => {
  const { t } = useTranslation('link')

  return [
    columnHelper.accessor(({ id, name }) => ({ id, name }), {
      header: t`linksTable.col.name`,
      cell: ({ getValue }) => (
        <TextLink
          href={{
            pathname: route.link.details.pathname,
            query: { id: getValue().id },
          }}
        >
          {getValue().name}
        </TextLink>
      ),
    }),
    columnHelper.accessor('type', {
      header: t`linksTable.col.type`,
    }),
    columnHelper.accessor('count', {
      header: t`linksTable.col.count`,
    }),
    columnHelper.accessor('createdAt', {
      header: t`linksTable.col.createdAt`,
      cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
    }),
    columnHelper.accessor('id', {
      header: t`linksTable.col.details`,
      enableSorting: false,
      cell: ({ getValue }) => (
        <TextLink
          href={{
            pathname: route.link.details.pathname,
            query: { id: getValue() },
          }}
        >
          {t`linksTable.view`}
        </TextLink>
      ),
    }),
  ]
}
