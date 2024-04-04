import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'

import { TextLink, FormattedDate } from '@/components/core/presentationals'
import { route } from '@/shared/route'

import type { LinksQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<LinksQuery['links'][number]>()

export const useLinksTableCol = () => {
  const { t } = useTranslation('link')

  return [
    columnHelper.accessor(({ id, name }) => ({ id, name }), {
      header: t`linksTable.col.name`,
      cell: ({ getValue }) => (
        <TextLink
          intent="table"
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
      cell: ({ getValue }) => <span>{t(`linkType.${getValue()}`)}</span>,
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
