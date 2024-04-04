import { useCallback, useMemo } from 'react'

import { useBranchesQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Dropdown } from '@/components/core/presentationals'
import { currencyToFlagIconName } from '@/shared/utils'

import type { BranchesQuery } from '@/api/graphql'
import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

export type BranchSwitchItem = DropdownItem<BranchesQuery['branches'][number]>

export const BranchSwitch: React.FC = () => {
  const [currentBranch, setCurrentBranch] = useCurrentBranch()
  const { data: { branches } = {} } = useBranchesQuery({
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
        flagIcon: currencyToFlagIconName(branch.currency),
      })) ?? [],
    [branches],
  )

  const handleBranchChange = useCallback(
    (change: UseSelectSelectedItemChange<BranchSwitchItem>) =>
      setCurrentBranch(change.selectedItem.value),
    [setCurrentBranch],
  )

  return (
    <div className="w-48">
      <Dropdown label="Current Branch">
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
