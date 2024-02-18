import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import {
  EntryStatus,
  useAddTransactionMutation,
  useGetAccountsQuery,
} from '@/api/graphql'
import { UpsertTransactionForm } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'
import { addEntryDefaultValues } from '@/lib'

export const InsertTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const [addTransaction] = useAddTransactionMutation({
    onCompleted: () => toast.success('Successfully added'),
  })

  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const values = useMemo(() => {
    const firstAccount = data?.accounts.at(0)

    if (firstAccount == null) {
      return undefined
    }

    const entry = {
      ...addEntryDefaultValues,
      accountId: firstAccount.id,
    }

    return {
      accrualDate: new Date(),
      note: '',
      tagIds: [],
      entries: [{ ...entry }, { ...entry }],
    }
  }, [data?.accounts])

  const handleOnSubmit = useCallback(
    (values: UpsertTransactionFormFieldValues) => {
      if (selectedTreasuryBookId == null) {
        return
      }

      void addTransaction({
        variables: {
          input: {
            ...values,
            treasuryBookId: selectedTreasuryBookId,
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
