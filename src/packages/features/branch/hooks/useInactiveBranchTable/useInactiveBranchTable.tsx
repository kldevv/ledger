import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Icon, InfoBubble, Link } from '@/packages/core/components'
import { useCurrency, useDate } from '@/packages/core/hooks'
import { route } from '@/shared/route'

import type { BranchesQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<BranchesQuery['branches'][number]>()

export const useInactiveBranchesTable = () => {
  const { t } = useTranslation('branch')
  const { format } = useDate()
  const { getData } = useCurrency()

  return useMemo(
    () => [
      columnHelper.accessor(
        ({ id, name }) => ({
          id,
          name,
        }),
        {
          header: t`inactiveBranchesTable.col.name`,
          cell: ({ getValue }) => (
            <Link.Text
              href={{
                pathname: route.branch.details.pathname,
                query: {
                  id: getValue().id,
                },
              }}
              variant="secondary"
            >
              {getValue().name}
            </Link.Text>
          ),
        },
      ),
      columnHelper.accessor('currency', {
        header: t`inactiveBranchesTable.col.currency`,
        cell: ({ getValue }) => (
          <InfoBubble>
            <span className="text-dark-shades mr-2 text-xs font-medium leading-6">
              {getValue()}
            </span>
            <Icon name={getData(getValue()).icon} className="size-3" />
          </InfoBubble>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: t`inactiveBranchesTable.col.createdAt`,
        cell: ({ getValue }) => format(getValue()),
      }),
      columnHelper.accessor('deletedAt', {
        header: t`inactiveBranchesTable.col.deletedAt`,
        cell: ({ getValue }) => {
          const date = getValue()

          return date != null ? format(date) : null
        },
      }),
      columnHelper.accessor('id', {
        header: t`inactiveBranchesTable.col.details`,
        cell: ({ getValue }) => (
          <Link.Text
            href={{
              pathname: route.branch.details.pathname,
              query: {
                id: getValue(),
              },
            }}
            variant="primary"
          >{t`inactiveBranchesTable.view`}</Link.Text>
        ),
      }),
    ],
    [format, getData, t],
  )
}
