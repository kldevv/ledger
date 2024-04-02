import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'

import { FormattedDate } from '@/components/core'
import { TextLink } from '@/components/core/presentationals'
import { route } from '@/shared/route'
import { tagTypeToSolidIconName } from '@/shared/utils'

import type { TagsQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<TagsQuery['tags'][number]>()

export const useTagsTableCol = () => {
  const { t } = useTranslation()

  return [
    columnHelper.accessor(({ id, name }) => ({ id, name }), {
      header: t`tagsTable.col.name`,
      cell: ({ getValue }) => (
        <TextLink
          intent="table"
          href={{
            pathname: route.tag.details.pathname,
            query: {
              id: getValue().id,
            },
          }}
        >
          {getValue().name}
        </TextLink>
      ),
    }),
    columnHelper.accessor('type', {
      header: t`tagsTable.col.type`,
      cell: ({ getValue }) => (
        <div className="flex items-center text-xs font-normal leading-6">
          <div className="mr-2">{tagTypeToSolidIconName(getValue())}</div>
          {t(`tagType.${getValue()}`)}
        </div>
      ),
    }),
    columnHelper.accessor('count', {
      header: t`tagsTable.col.count`,
    }),
    columnHelper.accessor('createdAt', {
      header: t`tagsTable.col.createdAt`,
      cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
    }),
    columnHelper.accessor('id', {
      header: t`tagsTable.col.details`,
      cell: ({ getValue }) => (
        <TextLink
          intent="table"
          href={{
            pathname: route.tag.details.pathname,
            query: { id: getValue() },
          }}
        >{t`tagsTable.view`}</TextLink>
      ),
    }),
  ]
}
