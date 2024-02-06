import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, Table, LinkButton } from '@/components/common'

import type { GetTagsQuery } from '@/api/graphql'

export type TagTableData = GetTagsQuery['getTags'][number]

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
      columnHelper.accessor('id', {
        header: t`TagTable.header.id`,
      }),
      columnHelper.accessor('name', {
        header: t`TagTable.header.name`,
        cell: (props) => (
          <span className="text-dark-shades">{props.getValue()}</span>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: t`TagTable.header.createdAt`,
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.display({
        id: 'view-link',
        cell: (props) => (
          <LinkButton
            href={`/tag/${props.row.getValue<string>('id')}`}
            label={t`TagTable.link.view`}
          />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
