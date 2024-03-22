import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAccountsQuery, useAddTransactionMutation } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { entryFieldDefaultValues } from '@/components/entry'
import {
  TransactionForm,
  type TransactionFormFieldValues,
} from '@/components/transaction'
import { useToaster } from '@/hooks'
import { parseCurrencyNumericFormat } from '@/shared'

export const AddTransactionForm: React.FC = () => {
  const { t } = useTranslation('journal')
  const [currentBranch] = useCurrentBranch()
  const toast = useToaster()
  const { data } = useAccountsQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch?.id == null,
  })

  const values = useMemo(() => {
    const entry = {
      ...entryFieldDefaultValues,
      accountId: data?.accounts?.at(0)?.id ?? '',
    }

    return {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [entry, entry],
    }
  }, [data?.accounts])

  const [addTransaction] = useAddTransactionMutation({
    onCompleted: () => toast(t`AddTransactionForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TransactionFormFieldValues) => {
      if (currentBranch?.id == null) return

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
