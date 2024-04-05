import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useBranchesQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Dropdown, Icon } from '@/components/core/presentationals'
import { currencyToFlagIconName } from '@/shared/utils'

import type { BranchesQuery } from '@/api/graphql'
import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

export type BranchSwitchItem = DropdownItem<BranchesQuery['branches'][number]>

export const BranchSwitch: React.FC = () => {
  const [currentBranch, setCurrentBranch] = useCurrentBranch()
  const { t } = useTranslation('branch')
  const {
    data: { branches } = {},
    loading,
    error,
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
        value: branch,
        title: branch.name,
        desc: branch.id,
        flagIcon: currencyToFlagIconName(branch.currency),
      })) ?? [],
    [branches],
  )

  const handleBranchChange = useCallback(
    (change: UseSelectSelectedItemChange<BranchSwitchItem>) =>
      setCurrentBranch(change.selectedItem.value),
    [setCurrentBranch],
  )

  if (loading) {
    return (
      <div className="ml-8">
        <svg
          version="1.1"
          id="L4"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          className="size-14"
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
      <div className="text-dark-red flex items-center gap-x-2 text-xs">
        <Icon.Solid name="ExclamationCircle" />
        <span>{t`branchSwitch.error`}</span>
      </div>
    )
  }

  return (
    <div className="w-60">
      <Dropdown>
        <Dropdown.Select
          items={items}
          value={items.find((item) => item.value.id === currentBranch?.id)}
          onChange={handleBranchChange}
        >
          <Dropdown.Options />
        </Dropdown.Select>
      </Dropdown>
    </div>
  )
}
