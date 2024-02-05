import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { EntryStatus, useTransactionDetailsQuery } from '@/api/graphql'
import { EntryFilteredTable } from '@/components/entry'
import { TransactionDescriptionList } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

export const TransactionDetails: React.FC = () => {
  const { t } = useTranslation('transaction')
  const router = useRouter()
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { id } = router.query
  const transactionId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useTransactionDetailsQuery({
    variables: {
      TransactionInput: {
        id: transactionId ?? '',
      },
      entriesInput: {
        transactionId,
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: transactionId == null || selectedTreasuryBookId == null,
  })

  if (data?.transaction == null) {
    return null
  }

  return (
    <div>
      <TransactionDescriptionList
        data={{
          ...data.transaction,
          status: data.entries.some(
            ({ status }) => status === EntryStatus.PENDING,
          )
            ? EntryStatus.PENDING
            : EntryStatus.COMPLETED,
        }}
      />
      <div className="mt-12 flex flex-col space-y-3">
        <h3 className="text-dark-shades font-semibold">{t`TransactionDetails.title.entries`}</h3>
        <EntryFilteredTable data={data.entries} />
      </div>
    </div>
  )
}
