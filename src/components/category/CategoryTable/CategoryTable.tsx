import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  CategoryTypeChip,
  FormattedDate,
  Table,
  LinkButton,
} from '@/components/common'
import { route } from '@/shared'

import type { CategoriesQuery } from '@/api/graphql'

export type CategoryTableData = CategoriesQuery['categories'][number]

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
              className="text-dark-shades hover:text-light-accent flex items-center"
            >
              {getValue().name}
            </Link>
          ),
        },
      ),
      columnHelper.accessor('type', {
        header: t`CategoryTable.header.type`,
        cell: ({ getValue }) => (
          <Link
            href={route.entryHome.pathname}
            className="hover:text-light-accent text-dark-shades flex items-center"
          >
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
          <LinkButton
            href={{
              pathname: route.categoryDetail.pathname,
              query: {
                id: getValue(),
              },
            }}
            label={t`CategoryTable.link.view`}
          />
        ),
      }),
    ],
    [t],
  )

  return <Table data={data} colDefs={colDefs} />
}
