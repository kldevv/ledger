import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useBranchesQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { ButtonCore, Dropdown, Icon } from '@/components/core/presentationals'
import { currencyToFlagIconName } from '@/shared/utils'

import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

export type BranchSwitchItem = DropdownItem<string>

export const BranchSwitch: React.FC = () => {
  const [currentBranch, setCurrentBranch] = useCurrentBranch()
  const { data: session } = useSession()
  const { t } = useTranslation('layout')

  const { data, loading, error, refetch } = useBranchesQuery({
    variables: {
      input: {
        userId: session?.user.id ?? '',
      },
    },
    skip: session?.user.id == null,
  })

  const items = useMemo<BranchSwitchItem[]>(
    () =>
      data?.branches?.map((branch) => ({
        value: branch.id,
        title: branch.name,
        desc: branch.id,
        flagIcon: currencyToFlagIconName(branch.currency),
      })) ?? [],
    [data?.branches],
  )

  const handleBranchChange = useCallback(
    (change: UseSelectSelectedItemChange<BranchSwitchItem>) =>
      setCurrentBranch(
        data?.branches?.find(
          (branch) => branch.id === change.selectedItem.value,
        ),
      ),
    [data?.branches, setCurrentBranch],
  )

  const handleRetry = useCallback(() => void refetch(), [refetch])

  if (error) {
    return (
      <div className="text-dark-red flex w-full items-center gap-x-2 text-xs">
        <Icon.Solid name="ExclamationCircle" />
        <span>{t`branchSwitch.error`}</span>
        <ButtonCore
          className="text-dark-shades hover:text-gray w-fit font-medium underline"
          onClick={handleRetry}
        >
          {t`branchSwitch.retry`}
        </ButtonCore>
      </div>
    )
  }

  if (!loading && data?.branches.length === 0) {
    return (
      <div className="text-dark-shades flex w-full items-center gap-x-2 text-xs">
        <Icon.Outline name="Squares2x2" className="text-gray" />
        <span>{t`branchSwitch.empty`}</span>
        <ButtonCore
          className="text-dark-shades hover:text-gray w-fit font-medium underline"
          onClick={handleRetry}
        >
          {t`branchSwitch.link`}
        </ButtonCore>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-x-2">
      <Icon.Outline name="Squares2x2" className="text-gray" />
      <div className="w-60">
        <Dropdown loading={loading}>
          <Dropdown.Select
            items={items}
            value={items.find((item) => item.value === currentBranch?.id)}
            onChange={handleBranchChange}
          >
            <Dropdown.Options />
          </Dropdown.Select>
        </Dropdown>
      </div>
    </div>
  )
}
