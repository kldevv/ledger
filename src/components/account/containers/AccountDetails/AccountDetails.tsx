import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useAccountQuery } from '@/api/graphql'
import {
  DescList,
  FormattedDate,
  type DescListItem,
  Card,
  TextLink,
} from '@/components/core/presentationals'
import { route } from '@/shared/route'

export const AccountDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('account')
  const { data: { account } = {}, loading } = useAccountQuery({
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
        title: t`accountDetails.id`,
        desc: account?.id,
      },
      {
        title: t`accountDetails.name`,
        desc: account?.name,
      },
      {
        title: t`accountDetails.group`,
        desc: (
          <div className="flex flex-col">
            <TextLink
              intent="table"
              href={{
                pathname: route.accountGroup.details.pathname,
                query: { id: account?.group.id },
              }}
            >
              {account?.group.name}
              <div className="text-gray hover:text-gray/50 text-xs font-normal">
                {account?.group.id}
              </div>
            </TextLink>
          </div>
        ),
      },
      {
        title: t`accountDetails.count`,
        desc: account?.count,
      },
      {
        title: t`accountDetails.branchId`,
        desc: (
          <TextLink
            intent="table"
            href={{
              pathname: route.branch.details.pathname,
              query: { id: account?.branchId },
            }}
          >
            {account?.branchId}
          </TextLink>
        ),
      },
      {
        title: t`accountDetails.createdAt`,
        desc: <FormattedDate dateTime={account?.createdAt} />,
      },
      {
        title: t`accountDetails.updatedAt`,
        desc: <FormattedDate dateTime={account?.updatedAt} />,
      },
      {
        title: t`accountDetails.deletedAt`,
        desc: <FormattedDate dateTime={account?.deletedAt} />,
      },
    ],
    [
      t,
      account?.id,
      account?.name,
      account?.group.id,
      account?.group.name,
      account?.count,
      account?.branchId,
      account?.createdAt,
      account?.updatedAt,
      account?.deletedAt,
    ],
  )

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <DescList items={descItems} loading={loading} />
      </Card>
    </div>
  )
}
