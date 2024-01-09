import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { DescriptionList, FormattedDate } from '@/components/common'

import type { GetAccountQuery } from '@/api/graphql'
import type { DescriptionListItem } from '@/components/common'

export type AccountDescriptionListData = Exclude<
  GetAccountQuery['getAccount'],
  null
>

export interface AccountDescriptionListProps {
  /**
   * Transaction detail
   */
  data: AccountDescriptionListData
}

export const AccountDescriptionList: React.FC<AccountDescriptionListProps> = ({
  data: { id, name, createdDate, updatedDate, category } = {},
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
        title: t('AccountDescriptionList.title.createdDate'),
        description: <FormattedDate dateTime={createdDate} />,
      },
      {
        title: t('AccountDescriptionList.title.updatedDate'),
        description: <FormattedDate dateTime={updatedDate} />,
      },
    ],
    [category?.name, createdDate, id, name, t, updatedDate],
  )

  return <DescriptionList items={items} />
}
