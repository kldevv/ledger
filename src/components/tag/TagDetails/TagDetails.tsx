import { useTranslation } from 'next-i18next'

import { useTagDetailsQuery } from '@/api/graphql'
import { TagDescriptionList } from '@/components/tag'
import { TransactionFilteredTable } from '@/components/transaction'
import { useResolvedQuery, useTreasuryBookContext } from '@/hooks'

export const TagDetails: React.FC = () => {
  const { t } = useTranslation('tag')
  const id = useResolvedQuery('id')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data: { tag, transactions } = {} } = useTagDetailsQuery({
    variables: {
      tagInput: { id: id ?? '' },
      transactionsInput: {
        treasuryBookId: selectedTreasuryBookId ?? '',
        tagId: id ?? '',
      },
    },
    skip: id == null || selectedTreasuryBookId == null,
  })

  return (
    <div>
      <TagDescriptionList data={tag} />
      <div className="mt-12 flex flex-col space-y-3">
        <h3 className="text-dark-shades font-semibold">
          {t`TagDetails.title.transactions`}
        </h3>
        <TransactionFilteredTable data={transactions ?? []} />
      </div>
    </div>
  )
}
