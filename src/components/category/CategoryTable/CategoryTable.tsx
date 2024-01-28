import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  CategoryTypeChip,
  FormattedDate,
  Table,
  ViewLink,
} from '@/components/common'

import type { GetCategoriesQuery } from '@/api/graphql'
import Link from 'next/link'
import { route } from '@/lib'

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
      columnHelper.accessor(
        ({ id, name }) => ({
          id,
          name,
        }),
        {
          header: t`CategoryTable.header.name`,
          cell: ({ getValue }) => (
            <Link
              href={{
                pathname: route.categoryDetail.pathname,
                query: {
                  id: getValue().id,
                },
              }}
              className="text-dark-shades flex items-center"
            >
              {getValue().name}
            </Link>
          ),
        },
      ),
      columnHelper.accessor('type', {
        header: t`CategoryTable.header.type`,
        cell: ({ getValue }) => (
          <Link href={route.entryHome.pathname} className="flex items-center">
            <CategoryTypeChip type={getValue()} />
          </Link>
        ),
      }),
      columnHelper.accessor('accountCount', {
        header: t`CategoryTable.header.accountCount`,
      }),
      columnHelper.accessor('createdAt', {
        header: t`CategoryTable.header.createdAt`,
        cell: ({ getValue }) => <FormattedDate dateTime={getValue()} />,
      }),
      columnHelper.accessor('id', {
        header: '',
        cell: ({ getValue }) => (
          <ViewLink
            href={{
              pathname: route.categoryDetail.pathname,
              query: {
                id: getValue(),
              },
            }}
          />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
