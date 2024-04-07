import { useTranslation } from 'next-i18next'

import { useEntriesQuery } from '@/api/graphql'
import { Card, Icon, Table } from '@/components/core/presentationals'
import { useEntriesTableCol } from '@/components/entry/hooks'

export interface AccountDetailsEntriesProps {
  /**
   * Account id
   */
  accountId: string
}

export const AccountDetailsEntries: React.FC<AccountDetailsEntriesProps> = ({
  accountId,
}) => {
  const { t } = useTranslation('account')
  const colDefs = useEntriesTableCol()
  const { data, loading } = useEntriesQuery({
    variables: {
      input: {
        accountId,
      },
    },
  })

  return (
    <Card>
      <div className="border-b-mid-gray text-gray mb-4 flex items-center gap-x-2 border-b py-4 text-xs font-normal">
        <Icon.Outline name="Bookmark" />
        {t`accountDetails.entries`}
      </div>
      <Table colDefs={colDefs} data={data?.entries ?? []} loading={loading} />
    </Card>
  )
}
