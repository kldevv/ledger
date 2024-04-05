import { useTranslation } from 'next-i18next'

import { useJournalsQuery } from '@/api/graphql'
import { Card, Icon, Table } from '@/components/core/presentationals'
import { useJournalsTableCol } from '@/components/journal/hooks'

export interface TagDetailsJournalsProps {
  /**
   * Tag id
   */
  tagId: string
}

export const TagDetailsJournals: React.FC<TagDetailsJournalsProps> = ({
  tagId,
}) => {
  const { t } = useTranslation('tag')
  const colDefs = useJournalsTableCol()
  const { data } = useJournalsQuery({
    variables: {
      input: {
        tagId,
      },
    },
    skip: tagId == null,
    fetchPolicy: 'cache-and-network',
  })

  return (
    <Card>
      <div className="border-b-mid-gray text-gray mb-4 flex items-center gap-x-2 border-b py-4 text-xs font-normal">
        <Icon.Outline name="ReceiptPercent" />
        {t`tagDetails.journals`}
      </div>
      <Table colDefs={colDefs} data={data?.journals ?? []} />
    </Card>
  )
}
