import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { FormattedDate } from '@/components/core/presentationals'
import { Card, DescList, Icon } from '@/packages/core/components'
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
  loading = false,
}) => {
  const { t } = useTranslation('branch')

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
        desc: <FormattedDate dateTime={branch?.createdAt} />,
      },
      {
        title: t`branchDescList.updatedAt`,
        desc: <FormattedDate dateTime={branch?.updatedAt} />,
      },
      {
        title: t`branchDescList.deletedAt`,
        desc: <FormattedDate dateTime={branch?.deletedAt} />,
        hide: branch?.deletedAt == null,
      },
    ],
    [t, branch],
  )

  return (
    <Card>
      <DescList items={descItems} loading={loading} />
    </Card>
  )
}
