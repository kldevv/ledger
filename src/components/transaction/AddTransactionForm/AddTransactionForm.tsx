import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddTransactionMutation } from '@/api/graphql'
import {
  entryFieldDefaultValues,
  TransactionForm,
  type TransactionFormFieldValues,
} from '@/components/transaction'
import { useAccountsContext, useToaster, useTreasuryBookContext } from '@/hooks'
import { parseCurrencyNumericFormat } from '@/shared'

export const AddTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const toast = useToaster()

  const { data: { accounts } = {} } = useAccountsContext()
  const values = useMemo(() => {
    const entry = {
      ...entryFieldDefaultValues,
      accountId: accounts?.at(0)?.id ?? '',
    }

    return {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [entry, entry],
    }
  }, [accounts])

  const [addTransaction] = useAddTransactionMutation({
    onCompleted: () => toast(t`AddTransactionForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TransactionFormFieldValues) => {
      if (selectedTreasuryBookId == null) return

      void addTransaction({
        variables: {
          input: {
            ...values,
            entries: values.entries.map((entry) => ({
              ...entry,
              // remove currency numeric format
              debit: parseCurrencyNumericFormat(entry.debit),
              // remove currency numeric format
              credit: parseCurrencyNumericFormat(entry.credit),
            })),
            treasuryBookId: selectedTreasuryBookId,
          },
        },
      })
    },
    [addTransaction, selectedTreasuryBookId],
  )

  return (
    <TransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`AddTransactionForm.submit`}
      values={values}
    />
  )
}
