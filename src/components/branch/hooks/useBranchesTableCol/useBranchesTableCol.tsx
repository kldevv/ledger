import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { CurrencyChip, FormattedDate } from '@/components/core'
import { useCurrentBranch } from '@/components/core/hooks'
import { ButtonCore, Icon, TextLink } from '@/components/core/presentationals'
import { route } from '@/shared/route'

import type { BranchesQuery, Branch } from '@/api/graphql'

const columnHelper = createColumnHelper<BranchesQuery['branches'][number]>()

export const useBranchesTableCol = () => {
  const { t } = useTranslation('branch')
  const [currentBranch, setCurrentBranch] = useCurrentBranch()

  const handleSwitch = useCallback(
    (branch: Branch) => () => setCurrentBranch(branch),
    [setCurrentBranch],
  )

  return [
    columnHelper.accessor('id', {
      header: t`branchesTable.col.on`,
      enableSorting: false,
      cell: ({ getValue }) =>
        getValue() === currentBranch?.id ? (
          <Icon.Outline name="FaceSmile" className="text-light-accent size-6" />
        ) : null,
    }),
    columnHelper.accessor((value) => value, {
      header: t`branchesTable.col.switch`,
      enableSorting: false,
      cell: ({ getValue }) => (
        <ButtonCore
          onClick={handleSwitch(getValue())}
          className="text-light-accent border-light-accent hover:bg-light-accent-halo h-fit rounded-md border px-1 text-xs font-medium leading-6"
        >
          {t`branchesTable.switch`}
        </ButtonCore>
      ),
    }),
    columnHelper.accessor(
      ({ id, name }) => ({
        id,
        name,
      }),
      {
        header: t`branchesTable.col.name`,
        cell: ({ getValue }) => (
          <TextLink
            href={{
              pathname: route.branch.details.pathname,
              query: {
                id: getValue().id,
              },
            }}
            intent="table"
          >
            {getValue().name}
          </TextLink>
        ),
      },
    ),
    columnHelper.accessor('currency', {
      header: t`branchesTable.col.currency`,
      cell: ({ getValue }) => <CurrencyChip currency={getValue()} />,
    }),
    columnHelper.accessor('createdAt', {
      header: t`branchesTable.col.createdAt`,
      cell: (props) => <FormattedDate dateTime={props.getValue()} />,
    }),
    columnHelper.accessor('id', {
      header: t`branchesTable.col.details`,
      cell: ({ getValue }) => (
        <TextLink
          href={{
            pathname: route.branch.details.pathname,
            query: {
              id: getValue(),
            },
          }}
        >{t`branchesTable.view`}</TextLink>
      ),
    }),
  ]
}
