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
  const { t } = useTranslation('layout')
  const {
    data: { branches } = {},
    loading,
    error,
    refetch,
  } = useBranchesQuery({
    variables: {
      input: {
        userId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
  })

  const items = useMemo<BranchSwitchItem[]>(
    () =>
      branches?.map((branch) => ({
        value: branch.id,
        title: branch.name,
        desc: branch.id,
        flagIcon: currencyToFlagIconName(branch.currency),
      })) ?? [],
    [branches],
  )

  const handleBranchChange = useCallback(
    (change: UseSelectSelectedItemChange<BranchSwitchItem>) =>
      setCurrentBranch(
        branches?.find((branch) => branch.id === change.selectedItem.value),
      ),
    [branches, setCurrentBranch],
  )

  const handleRetry = useCallback(() => void refetch(), [refetch])

  if (loading) {
    return (
      <div className="text-gray/30 ml-8">
        <svg
          version="1.1"
          id="L4"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          className="size-20"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
        >
          <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill="currentColor" stroke="none" cx="26" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill="currentColor" stroke="none" cx="46" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      </div>
    )
  }

  if (error || !currentBranch) {
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

  return (
    <div className="flex items-center gap-x-2">
      <Icon.Outline name="Squares2x2" className="text-gray" />
      <div className="w-60">
        <Dropdown>
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
