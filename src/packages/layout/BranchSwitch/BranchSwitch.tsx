import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useBranchesQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Dropdown, Icon } from '@/components/core/presentationals'
import { Button, Link } from '@/packages/core/components'
import { branch } from '@/shared/route/routes'
import { currencyToFlagIconName } from '@/shared/utils'

import type { DropdownItem } from '@/components/core/presentationals'
import type { UseSelectSelectedItemChange } from 'downshift'

export type BranchSwitchItem = DropdownItem<string>

export const BranchSwitch: React.FC = () => {
  const { t } = useTranslation('layout')
  const [currentBranch, setCurrentBranch] = useCurrentBranch()
  const { data: session } = useSession()

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

  return (
    <div className="flex items-center gap-x-2">
      <Icon.Outline name="Squares2x2" className="text-gray" />
      {error != null ? (
        <>
          <span>{t`branchSwitch.error`}</span>
          <Button.Text
            className="w-fit font-normal underline"
            onClick={handleRetry}
            variant="secondary"
            label={t`branchSwitch.retry`}
          />
        </>
      ) : !loading && data?.branches.length === 0 ? (
        <>
          <span>{t`branchSwitch.empty`}</span>
          <Link.Text
            className="w-fit font-normal underline"
            variant="secondary"
            href={branch.add}
          >
            {t`branchSwitch.link`}
          </Link.Text>
        </>
      ) : (
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
      )}
    </div>
  )
}
