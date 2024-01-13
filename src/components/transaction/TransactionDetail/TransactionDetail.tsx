import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { EntryStatus, useGetTransactionDetailQuery } from '@/api/graphql'
import { EntryTable } from '@/components/entry'
import { TransactionDescriptionList } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

export const TransactionDetail: React.FC = () => {
  const { t } = useTranslation('transaction')
  const router = useRouter()
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { id } = router.query
  const transactionId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetTransactionDetailQuery({
    variables: {
      getTransactionInput: {
        id: transactionId ?? '',
      },
      getEntriesInput: {
        transactionId,
        vaultId: selectedTreasuryBookId ?? '',
      },
    },
    skip: transactionId == null || selectedTreasuryBookId == null,
  })

  return (
    data?.getTransaction && (
      <div>
        <TransactionDescriptionList
          data={{
            ...data.getTransaction,
            status: data.getEntries.some(
              ({ status }) => status === EntryStatus.PENDING,
            )
              ? EntryStatus.PENDING
              : EntryStatus.COMPLETED,
          }}
        />
        <h3 className="mt-12 font-semibold text-dark-shades">{t`TransactionDetail.title.entries`}</h3>
        <EntryTable data={data.getEntries} />
      </div>
    )
  )
}
