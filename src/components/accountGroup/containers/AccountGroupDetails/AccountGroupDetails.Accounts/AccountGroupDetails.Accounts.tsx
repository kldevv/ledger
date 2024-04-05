import { useTranslation } from 'next-i18next'

import { useAccountsQuery } from '@/api/graphql'
import { useAccountsTableCol } from '@/components/account/hooks'
import { Card, Icon, Table } from '@/components/core/presentationals'

export interface AccountGroupDetailsAccountsProps {
  /**
   * Account group id
   */
  accountGroupId: string
}

export const AccountGroupDetailsAccounts: React.FC<
  AccountGroupDetailsAccountsProps
> = ({ accountGroupId }) => {
  const { t } = useTranslation('accountGroup')
  const colDefs = useAccountsTableCol()
  const { data, loading } = useAccountsQuery({
    variables: {
      input: {
        accountGroupId,
      },
    },
    skip: accountGroupId == null,
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Card>
      <div className="border-b-mid-gray text-gray mb-4 flex items-center gap-x-2 border-b py-4 text-xs font-normal">
        <Icon.Outline name="Wallet" />
        {t`accountGroupDetails.accounts`}
      </div>
      <Table
        colDefs={colDefs}
        data={data?.accounts ?? []}
        loading={loading || !data}
      />
    </Card>
  )
}
