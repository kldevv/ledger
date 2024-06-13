import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useCurrentBranch } from '@/components/core/hooks'
import { Button, Icon, InfoBubble, Link } from '@/packages/core/components'
import { useCurrency, useDate } from '@/packages/core/hooks'
import { route } from '@/shared/route'

import type { Branch, BranchesQuery } from '@/api/graphql'

const columnHelper = createColumnHelper<BranchesQuery['branches'][number]>()

export const useActiveBranchesTable = () => {
  const { t } = useTranslation('branch')
  const [currentBranch, setCurrentBranch] = useCurrentBranch()
  const { format } = useDate()
  const { getData } = useCurrency()

  const handleOnBranchSwitch = useCallback(
    (branch: Branch) => () => setCurrentBranch(branch),
    [setCurrentBranch],
  )

  return useMemo(
    () => [
      columnHelper.accessor((value) => value, {
        header: '',
        id: 'select',
        enableSorting: false,
        cell: ({ getValue }) =>
          getValue().id !== currentBranch?.id ? (
            <Button
              onClick={handleOnBranchSwitch(getValue())}
              className="w-fit text-[0.625rem] font-medium"
              variant="secondary"
            >{t`activeBranchesTable.switch`}</Button>
          ) : (
            <InfoBubble>
              <span className="text-dark-shades py-1 text-[0.625rem] font-semibold">
                Current
              </span>
            </InfoBubble>
          ),
      }),
      columnHelper.accessor(
        ({ id, name }) => ({
          id,
          name,
        }),
        {
          header: t`activeBranchesTable.col.name`,
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
        header: t`activeBranchesTable.col.currency`,
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
        header: t`activeBranchesTable.col.createdAt`,
        cell: (props) => format(props.getValue()),
      }),
      columnHelper.accessor('id', {
        header: t`activeBranchesTable.col.details`,
        cell: ({ getValue }) => (
          <Link.Text
            href={{
              pathname: route.branch.details.pathname,
              query: {
                id: getValue(),
              },
            }}
            variant="primary"
          >{t`activeBranchesTable.view`}</Link.Text>
        ),
      }),
    ],
    [currentBranch?.id, format, getData, handleOnBranchSwitch, t],
  )
}
