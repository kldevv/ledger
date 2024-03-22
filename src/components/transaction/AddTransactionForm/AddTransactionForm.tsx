import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddTransactionMutation } from '@/api/graphql'
import { entryFieldDefaultValues } from '@/components/entry'
import {
  TransactionForm,
  type TransactionFormFieldValues,
} from '@/components/transaction'
import { useAccountsContext, useToaster } from '@/hooks'
import { parseCurrencyNumericFormat } from '@/shared'
import { useCurrentBranch } from '@/components/core/hooks'

export const AddTransactionForm: React.FC = () => {
  const { t } = useTranslation('journal')
  const [currentBranch] = useCurrentBranch()
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
      if (!currentBranch?.id) return

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
            treasuryBookId: currentBranch?.id,
          },
        },
      })
    },
    [addTransaction, currentBranch?.id],
  )

  return (
    <TransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`AddTransactionForm.submit`}
      values={values}
    />
  )
}
