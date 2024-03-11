import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import {
  useTransactionDetailsQuery,
  useUpdateTransactionMutation,
} from '@/api/graphql'
import { TransactionForm } from '@/components/transaction'
import { useResolvedQuery, useToaster, useTreasuryBookContext } from '@/hooks'
import { parseCurrencyNumericFormat } from '@/shared'

import type { TransactionFormFieldValues } from '@/components/transaction'

export const UpdateTransactionForm: React.FC = () => {
  const { t } = useTranslation('journal')
  const id = useResolvedQuery('id')
  const toast = useToaster()
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

  const values = useMemo(() => {
    if (transaction == null) return

    return {
      ...transaction,
      tagIds: transaction?.tags?.map(({ id }) => id) ?? [],
      entries:
        entries?.map(({ debit, credit, account, ...entry }) => ({
          ...entry,
          debit: String(debit),
          credit: String(credit),
          accountId: account?.id ?? '',
        })) ?? [],
    }
  }, [entries, transaction])

  const [updateTransaction] = useUpdateTransactionMutation({
    onCompleted: () => toast(t`UpdateTransactionForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TransactionFormFieldValues) => {
      if (transaction == null) return

      void updateTransaction({
        variables: {
          input: {
            ...values,
            id: transaction.id,
            treasuryBookId: transaction.treasuryBookId,
            entries: values.entries.map((entry) => ({
              ...entry,
              // remove currency numeric format
              debit: parseCurrencyNumericFormat(entry.debit),
              // remove currency numeric format
              credit: parseCurrencyNumericFormat(entry.credit),
            })),
          },
        },
      })
    },
    [transaction, updateTransaction],
  )

  return (
    <TransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateTransactionForm.submit`}
      values={values}
    />
  )
}
