import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { Card, DescList, Icon } from '@/packages/core/components'
import { useDate } from '@/packages/core/hooks'
import { currencyToFlagIconName } from '@/shared/utils'

import type { Branch } from '@/api/graphql'
import type { DescListItem } from '@/packages/core/components'

export interface BranchDescListProps {
  /**
   * Branch
   */
  branch?: Branch
  /**
   * Loading
   */
  loading: boolean
}

export const BranchDescList: React.FC<BranchDescListProps> = ({
  branch,
  loading,
}) => {
  const { t } = useTranslation('branch')
  const { format } = useDate()

  const descItems = useMemo<DescListItem[]>(
    () => [
      {
        title: t`branchDescList.id`,
        desc: branch?.id,
      },
      {
        title: t`branchDescList.name`,
        desc: branch?.name,
      },
      {
        title: t`branchDescList.currency`,
        desc: branch ? (
          <div className="flex items-center gap-x-1">
            <Icon name={currencyToFlagIconName(branch.currency)} />
            {t(`currency.${branch.currency}`)}
          </div>
        ) : null,
      },
      {
        title: t`branchDescList.createdAt`,
        desc: branch?.createdAt ? format(branch?.createdAt) : null,
      },
      {
        title: t`branchDescList.updatedAt`,
        desc: branch?.createdAt ? format(branch?.updatedAt) : null,
      },
      {
        title: t`branchDescList.deletedAt`,
        desc: branch?.deletedAt ? format(branch?.deletedAt) : null,
        hide: branch?.deletedAt == null,
      },
    ],
    [t, branch, format],
  )

  return (
    <Card>
      <DescList items={descItems} loading={loading} />
    </Card>
  )
}
