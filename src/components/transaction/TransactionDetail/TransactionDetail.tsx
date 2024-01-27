import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { EntryStatus, useGetTransactionDetailQuery } from '@/api/graphql'
import { EntryFilteredTable } from '@/components/entry'
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
        treasuryBookId: selectedTreasuryBookId ?? '',
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
        <div className="mt-12 flex flex-col space-y-3">
          <h3 className="font-semibold text-dark-shades">{t`TransactionDetail.title.entries`}</h3>
          <EntryFilteredTable data={data.getEntries} />
        </div>
      </div>
    )
  )
}
