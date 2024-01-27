import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetTagDetailQuery } from '@/api/graphql'
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

  const { data } = useGetTagDetailQuery({
    variables: {
      getTagInput: { id: tagId ?? '' },
      getTransactionsInput: {
        treasuryBookId: selectedTreasuryBookId ?? '',
        tagId,
      },
    },
    skip: tagId == null || selectedTreasuryBookId == null,
  })

  return (
    data?.getTag && (
      <div>
        <TagDescriptionList data={data?.getTag} />
        <div className="mt-12 flex flex-col space-y-3">
          <h3 className="font-semibold text-dark-shades">
            {t`TagDetail.title.transactions`}
          </h3>
          <TransactionFilteredTable data={data.getTransactions ?? []} />
        </div>
      </div>
    )
  )
}
