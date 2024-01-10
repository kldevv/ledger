import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetTagDetailQuery } from '@/api/graphql'
import { TagDescriptionList } from '@/components/tag'
import { TransactionTable } from '@/components/transaction'
import { useVaultContext } from '@/hooks'

export const TagDetail: React.FC = () => {
  const { t } = useTranslation('tag')
  const router = useRouter()
  const [{ curVaultId }] = useVaultContext()

  const { id } = router.query
  const tagId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetTagDetailQuery({
    variables: {
      getTagInput: { id: tagId ?? '' },
      getTransactionsInput: { vaultId: curVaultId ?? '', tagId },
    },
    skip: tagId == null || curVaultId == null,
  })

  return (
    data?.getTag && (
      <div>
        <TagDescriptionList data={data?.getTag} />
        <h3 className="mt-12 font-semibold text-dark-shades">
          {t('TagDetail.title.transactions')}
        </h3>
        <TransactionTable data={data.getTransactions ?? []} />
      </div>
    )
  )
}
