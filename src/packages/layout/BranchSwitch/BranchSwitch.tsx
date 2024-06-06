import { useSession } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useBranchesQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { Button, Dropdown, Icon, Link } from '@/packages/core/components'
import { branch } from '@/shared/route/routes'
import { currencyToFlagIconName } from '@/shared/utils'

import type { DropdownItem } from '@/packages/core/components'

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

  const items = useMemo<DropdownItem[]>(
    () =>
      data?.branches?.map((branch) => ({
        value: branch.id,
        label: branch.name,
        desc: branch.id,
        icon: currencyToFlagIconName(branch.currency),
      })) ?? [],
    [data?.branches],
  )

  const handleOnChange = useCallback(
    (value: DropdownItem | null) =>
      setCurrentBranch(
        data?.branches?.find((branch) => branch.id === value?.value),
      ),
    [data?.branches, setCurrentBranch],
  )

  const handleRetry = useCallback(() => void refetch(), [refetch])

  return (
    <div className="flex items-center gap-x-2">
      <Icon name="Squares2x2" className="text-gray size-5" />
      {error != null ? (
        <div className="flex gap-x-1 whitespace-nowrap text-xs font-normal">
          <span>{t`branchSwitch.error`}</span>
          <Button.Text
            className="w-fit"
            onClick={handleRetry}
            variant="primary"
            label={t`branchSwitch.retry`}
          />
        </div>
      ) : !loading && data?.branches.length === 0 ? (
        <div className="flex gap-x-1 whitespace-nowrap text-xs font-normal">
          <span className="text-gray">{t`branchSwitch.empty`}</span>
          <Link.Text className="w-fit" variant="primary" href={branch.add}>
            {t`branchSwitch.link`}
          </Link.Text>
        </div>
      ) : (
        <div className="w-60">
          <Dropdown
            triggerLoading={loading}
            onChange={handleOnChange}
            items={items}
            value={
              items.find((item) => item.value === currentBranch?.id) ?? null
            }
          />
        </div>
      )}
    </div>
  )
}
