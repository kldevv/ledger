import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useAccountGroupQuery } from '@/api/graphql'
import {
  DescList,
  Icon,
  FormattedDate,
  type DescListItem,
  Card,
  TextLink,
} from '@/components/core/presentationals'
import { route } from '@/shared/route'
import { accountingTypeToOutlineIconName } from '@/shared/utils'

import { AccountGroupDetailsAccounts } from './AccountGroupDetails.Accounts/AccountGroupDetails.Accounts'
import { AccountGroupDetailsJournals } from './AccountGroupDetails.Journals/AccountGroupDetails.Journals'

export const AccountGroupDetails: React.FC = () => {
  const {
    query: { id },
  } = useRouter()
  const { t } = useTranslation('accountGroup')
  const { data: { accountGroup } = {}, loading } = useAccountGroupQuery({
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
        title: t`accountGroupDetails.id`,
        desc: accountGroup?.id,
      },
      {
        title: t`accountGroupDetails.name`,
        desc: accountGroup?.name,
      },
      {
        title: t`accountGroupDetails.type`,
        desc: (
          <div className="flex items-center gap-x-1">
            <Icon.Outline
              name={accountingTypeToOutlineIconName(accountGroup?.type)}
            />
            {t(`accountingType.${accountGroup?.type}`)}
          </div>
        ),
      },
      {
        title: t`accountGroupDetails.count`,
        desc: accountGroup?.count,
      },
      {
        title: t`accountGroupDetails.branchId`,
        desc: (
          <TextLink
            intent="table"
            href={{
              pathname: route.branch.details.pathname,
              query: { id: accountGroup?.branchId },
            }}
          >
            {accountGroup?.branchId}
          </TextLink>
        ),
      },
      {
        title: t`accountGroupDetails.createdAt`,
        desc: <FormattedDate dateTime={accountGroup?.createdAt} />,
      },
      {
        title: t`accountGroupDetails.updatedAt`,
        desc: <FormattedDate dateTime={accountGroup?.updatedAt} />,
      },
      {
        title: t`accountGroupDetails.deletedAt`,
        desc: <FormattedDate dateTime={accountGroup?.deletedAt} />,
      },
    ],
    [
      t,
      accountGroup?.id,
      accountGroup?.name,
      accountGroup?.type,
      accountGroup?.count,
      accountGroup?.branchId,
      accountGroup?.createdAt,
      accountGroup?.updatedAt,
      accountGroup?.deletedAt,
    ],
  )

  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <DescList items={descItems} loading={loading} />
      </Card>
      {typeof id === 'string' && (
        <div className="flex flex-col gap-y-4">
          <AccountGroupDetailsAccounts accountGroupId={id} />
          <AccountGroupDetailsJournals accountGroupId={id} />
        </div>
      )}
    </div>
  )
}
