import { useTranslation } from 'next-i18next'

import { useEntriesQuery } from '@/api/graphql'
import { Card, Icon, Table } from '@/components/core/presentationals'
import { useEntriesTableCol } from '@/components/entry/hooks'

export interface JournalDetailsEntriesProps {
  /**
   * Journal id
   */
  journalId: string
}

export const JournalDetailsEntries: React.FC<JournalDetailsEntriesProps> = ({
  journalId,
}) => {
  const { t } = useTranslation('journal')
  const colDefs = useEntriesTableCol()
  const { data, loading } = useEntriesQuery({
    variables: {
      input: {
        journalId,
      },
    },
  })

  return (
    <Card>
      <div className="border-b-mid-gray text-gray mb-4 flex items-center gap-x-2 border-b py-4 text-xs font-normal">
        <Icon.Outline name="Bookmark" />
        {t`journalDetails.entries`}
      </div>
      <Table colDefs={colDefs} data={data?.entries ?? []} loading={loading} />
    </Card>
  )
}
