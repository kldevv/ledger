import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import {
  Card,
  DescList,
  FormattedDate,
  type DescListItem,
} from '@/components/core/presentationals'
import { Icon } from '@/packages/core/components'
import { currencyToFlagIconName } from '@/shared/utils'

import type { Branch } from '@/api/graphql'

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
        title: t`branchDetails.id`,
        desc: branch?.id,
      },
      {
        title: t`branchDetails.name`,
        desc: branch?.name,
      },
      {
        title: t`branchDetails.currency`,
        desc: branch ? (
          <div className="flex items-center gap-x-1">
            <Icon name={currencyToFlagIconName(branch.currency)} />
            {t(`currency.${branch.currency}`)}
          </div>
        ) : null,
      },
      {
        title: t`branchDetails.createdAt`,
        desc: <FormattedDate dateTime={branch?.createdAt} />,
      },
      {
        title: t`branchDetails.updatedAt`,
        desc: <FormattedDate dateTime={branch?.updatedAt} />,
      },
      {
        title: t`branchDetails.deletedAt`,
        desc: <FormattedDate dateTime={branch?.deletedAt} />,
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
