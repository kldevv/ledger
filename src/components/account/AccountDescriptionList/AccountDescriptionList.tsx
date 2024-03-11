import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate } from '@/components/core'

import type { AccountQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/core'

export type AccountDescriptionListData = Exclude<AccountQuery['account'], null>

export interface AccountDescriptionListProps {
  /**
   * Transaction detail
   */
  data: AccountDescriptionListData
}

export const AccountDescriptionList: React.FC<AccountDescriptionListProps> = ({
  data: { id, name, createdAt, updatedAt, category } = {},
}) => {
  const { t } = useTranslation('account')

  const items: DescriptionListItem[] = useMemo(
    () => [
      {
        title: t('AccountDescriptionList.title.id'),
        description: id,
      },
      {
        title: t('AccountDescriptionList.title.name'),
        description: name,
      },
      {
        title: t('AccountDescriptionList.title.category'),
        description: category?.name,
      },
      {
        title: t('AccountDescriptionList.title.createdAt'),
        description: <FormattedDate dateTime={createdAt} />,
      },
      {
        title: t('AccountDescriptionList.title.updatedAt'),
        description: <FormattedDate dateTime={updatedAt} />,
      },
    ],
    [category?.name, createdAt, id, name, t, updatedAt],
  )

  return <DescriptionList items={items} />
}
