import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useBranchQuery } from '@/api/graphql'
import {
  DescList,
  Icon,
  FormattedDate,
  type DescListItem,
  Card,
} from '@/components/core/presentationals'
import { currencyToFlagIconName } from '@/shared/utils'

export const BranchDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('branch')
  const { data: { branch } = {}, loading } = useBranchQuery({
    variables: {
      input: {
        id: (Array.isArray(id) ? id.at(0) : id) ?? '',
      },
    },
    skip: id == null,
  })

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
            <Icon.Flag name={currencyToFlagIconName(branch.currency)} />
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
