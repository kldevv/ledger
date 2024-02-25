import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddTransactionMutation, useAccountsQuery } from '@/api/graphql'
import {
  entryFieldDefaultValues,
  TransactionForm,
  type TransactionFormFieldValues,
} from '@/components/transaction'
import { useToaster, useTreasuryBookContext } from '@/hooks'
import { parseNumberString } from '@/shared'

export const AddTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const toast = useToaster()

  const [addTransaction] = useAddTransactionMutation({
    onCompleted: () => toast('Transaction is added successfully'),
  })

  const { data } = useAccountsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const values = useMemo(() => {
    const firstAccount = data?.accounts.at(0)

    const entry = {
      ...entryFieldDefaultValues,
      accountId: firstAccount?.id ?? '',
    }

    return {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [entry, entry],
    }
  }, [data?.accounts])

  const handleOnSubmit = useCallback(
    (values: TransactionFormFieldValues) => {
      if (selectedTreasuryBookId == null) {
        return
      }

      void addTransaction({
        variables: {
          input: {
            ...values,
            entries: values.entries.map((entry) => ({
              ...entry,
              debit: parseNumberString(entry.debit),
              credit: parseNumberString(entry.credit),
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
