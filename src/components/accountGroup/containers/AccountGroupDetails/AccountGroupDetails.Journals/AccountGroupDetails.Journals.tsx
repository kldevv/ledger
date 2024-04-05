import { useTranslation } from 'next-i18next'

import { useJournalsQuery } from '@/api/graphql'
import { Card, Table } from '@/components/core/presentationals'
import { useJournalsTableCol } from '@/components/journal/hooks'

export interface AccountGroupDetailsJournalsProps {
  /**
   * Account group id
   */
  accountGroupId: string
}

export const AccountGroupDetailsJournals: React.FC<
  AccountGroupDetailsJournalsProps
> = ({ accountGroupId }) => {
  const { t } = useTranslation('accountGroup')
  const colDefs = useJournalsTableCol()
  const { data, loading } = useJournalsQuery({
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
      <div className="border-b-mid-gray text-gray mb-4 border-b py-4 text-xs font-normal">
        {t`accountGroupDetails.journals`}
      </div>
      <Table
        colDefs={colDefs}
        data={data?.journals ?? []}
        loading={loading || !data}
      />
    </Card>
  )
}
