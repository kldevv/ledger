import { useTranslation } from 'next-i18next'

import { EntryStatus, useTransactionDetailsQuery } from '@/api/graphql'
import { EntryFilteredTable } from '@/components/entry'
import { TransactionDescriptionList } from '@/components/transaction'
import { useResolvedQuery, useTreasuryBookContext } from '@/hooks'

export const TransactionDetails: React.FC = () => {
  const { t } = useTranslation('journal')
  const id = useResolvedQuery('id', '')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const { data: { transaction, entries } = {} } = useTransactionDetailsQuery({
    variables: {
      TransactionInput: {
        id: id ?? '',
      },
      entriesInput: {
        transactionId: id,
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: id == null || selectedTreasuryBookId == null,
  })

  return (
    <div>
      <TransactionDescriptionList
        data={{
          ...transaction,
          status:
            entries?.some(({ status }) => status === EntryStatus.PENDING) ===
            true
              ? EntryStatus.PENDING
              : EntryStatus.COMPLETED,
        }}
      />
      <div className="mt-12 flex flex-col space-y-3">
        <h3 className="text-dark-shades font-semibold">{t`TransactionDetails.title.entries`}</h3>
        <EntryFilteredTable data={entries ?? []} />
      </div>
    </div>
  )
}
