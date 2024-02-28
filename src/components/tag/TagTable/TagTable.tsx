import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  FormattedDate,
  Table,
  LinkButton,
  TagTypeChip,
} from '@/components/common'
import { route } from '@/shared'

import type { TagsQuery } from '@/api/graphql'

export type TagTableData = TagsQuery['tags'][number]

export interface TagTableProps {
  /**
   * Data
   */
  data: TagTableData[]
}

const columnHelper = createColumnHelper<TagTableData>()

export const TagTable: React.FC<TagTableProps> = ({ data }) => {
  const { t } = useTranslation('tag')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor(({ id, name }) => ({ id, name }), {
        header: t`TagTable.header.name`,
        cell: ({ getValue }) => (
          <Link
            href={{
              pathname: route.tagDetail.pathname,
              query: {
                id: getValue().id,
              },
            }}
            className="text-dark-shades hover:text-light-accent flex items-center"
          >
            {getValue().name}
          </Link>
        ),
      }),
      columnHelper.accessor('type', {
        header: t`TagTable.header.transaction`,
        cell: ({ getValue }) => <TagTypeChip type={getValue()} />,
      }),
      columnHelper.accessor('count', {
        header: t`TagTable.header.transaction`,
      }),
      columnHelper.accessor('createdAt', {
        header: t`TagTable.header.createdAt`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('id', {
        id: 'view-link',
        header: '',
        cell: ({ getValue }) => (
          <LinkButton
            href={{
              pathname: route.tagDetail.pathname,
              query: { id: getValue() },
            }}
            label={t`TagTable.link.view`}
          />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
