import { useTranslation } from 'next-i18next'

import { useTagDetailsQuery } from '@/api/graphql'
import { TagDescriptionList } from '@/components/tag'
import { TransactionFilteredTable } from '@/components/transaction'
import { useResolvedQuery } from '@/hooks'
import { useCurrentBranch } from '@/components/core/hooks'

export const TagDetails: React.FC = () => {
  const { t } = useTranslation('tag')
  const id = useResolvedQuery('id')
  const [currentBranch] = useCurrentBranch()

  const { data: { tag, transactions } = {} } = useTagDetailsQuery({
    variables: {
      tagInput: { id: id ?? '' },
      transactionsInput: {
        treasuryBookId: currentBranch?.id ?? '',
        tagId: id ?? '',
      },
    },
    skip: id == null || !currentBranch?.id,
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
