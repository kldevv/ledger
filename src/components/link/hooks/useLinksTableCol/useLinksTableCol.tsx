import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'

import { TextLink } from '@/components/core/presentationals'

import type { LinksQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<LinksQuery['links'][number]>()

export const useLinksTableCol = () => {
  const { t } = useTranslation('link')

  return [
    columnHelper.accessor(({ id, name }) => ({ id, name }), {
      header: t`linksTable.col.name`,
      cell: ({ getValue }) => (
        <TextLink href={getValue().id}>{getValue().name}</TextLink>
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
    }),
  ]
}
