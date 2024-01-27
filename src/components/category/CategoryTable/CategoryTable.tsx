import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate, Table, ViewLink } from '@/components/common'

import type { GetCategoriesQuery } from '@/api/graphql'

export type CategoryTableData = GetCategoriesQuery['getCategories'][number]

export interface CategoryTableProps {
  /**
   * Data
   */
  data: CategoryTableData[]
}

const columnHelper = createColumnHelper<CategoryTableData>()

export const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  const { t } = useTranslation('category')

  const colDefs = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: t`CategoryTable.header.id`,
      }),
      columnHelper.accessor('name', {
        header: t`CategoryTable.header.name`,
        cell: (props) => (
          <span className="text-dark-shades">{props.getValue()}</span>
        ),
      }),
      columnHelper.accessor('type', {
        header: t`CategoryTable.header.type`,
      }),
      columnHelper.accessor('createdAt', {
        header: t`CategoryTable.header.createdAt`,
        cell: (props) => <FormattedDate dateTime={props.getValue()} />,
      }),
      columnHelper.display({
        id: 'view-link',
        cell: (props) => (
          <ViewLink href={`/category/${props.row.getValue<string>('id')}`} />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
