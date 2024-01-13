import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import {
  EntryStatus,
  useAddTransactionMutation,
  useGetAccountsQuery,
} from '@/api/graphql'
import { UpsertTransactionForm } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'

export const InsertTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const [addTransaction] = useAddTransactionMutation({
    onCompleted: (data) => console.log(data),
  })

  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        vaultId: selectedTreasuryBookId,
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const values = useMemo(() => {
    if (data?.getAccounts[0] == null) {
      return undefined
    }

    const entry = {
      transactionDate: new Date(),
      accountId: data.getAccounts[0]?.id,
      memo: '',
      status: EntryStatus.PENDING,
      debit: 0,
      credit: 0,
    }

    return {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [{ ...entry }, { ...entry }],
    }
  }, [data?.getAccounts])

  const handleOnSubmit = useCallback(
    (values: UpsertTransactionFormFieldValues) => {
      if (selectedTreasuryBookId == null) {
        return
      }

      void addTransaction({
        variables: {
          input: {
            ...values,
            vaultId: selectedTreasuryBookId,
          },
        },
      })
    },
    [addTransaction, selectedTreasuryBookId],
  )

  return (
    <UpsertTransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`InsertTransactionForm.submit`}
      values={values}
    />
  )
}
