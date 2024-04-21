import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useUserQuery } from '@/api/graphql'
import {
  DescList,
  FormattedDate,
  type DescListItem,
  Card,
} from '@/components/core/presentationals'

export const UserDetails: React.FC = () => {
  const { t } = useTranslation('user')
  const { data: { user } = {}, loading } = useUserQuery()

  const descItems = useMemo<DescListItem[]>(
    () => [
      {
        title: t`userDetails.id`,
        desc: user?.id,
      },
      {
        title: t`userDetails.name`,
        desc: user?.name,
      },
      {
        title: t`userDetails.authType`,
        desc: user?.authType,
      },
      {
        title: t`userDetails.provider`,
        desc: t(`provider.${user?.provider}`),
      },
      {
        title: t`userDetails.createdAt`,
        desc: <FormattedDate dateTime={user?.createdAt} />,
      },
      {
        title: t`userDetails.updatedAt`,
        desc: <FormattedDate dateTime={user?.updatedAt} />,
      },
    ],
    [
      t,
      user?.authType,
      user?.createdAt,
      user?.id,
      user?.name,
      user?.provider,
      user?.updatedAt,
    ],
  )

  return (
    <Card>
      <DescList items={descItems} loading={loading} />
    </Card>
  )
}
