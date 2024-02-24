import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useTagDetailQuery } from '@/api/graphql'
import { TagDescriptionList } from '@/components/tag'
import { TransactionFilteredTable } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

export const TagDetail: React.FC = () => {
  const { t } = useTranslation('tag')
  const router = useRouter()
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { id } = router.query
  const tagId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useTagDetailQuery({
    variables: {
      TagInput: { id: tagId ?? '' },
      TransactionsInput: {
        treasuryBookId: selectedTreasuryBookId ?? '',
        tagId,
      },
    },
    skip: tagId == null || selectedTreasuryBookId == null,
  })

  return (
    data?.tag && (
      <div>
        <TagDescriptionList data={data?.tag} />
        <div className="mt-12 flex flex-col space-y-3">
          <h3 className="text-dark-shades font-semibold">
            {t`TagDetail.title.transactions`}
          </h3>
          <TransactionFilteredTable data={data.transactions ?? []} />
        </div>
      </div>
    )
  )
}
