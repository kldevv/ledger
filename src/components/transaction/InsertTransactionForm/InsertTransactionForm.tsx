import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddTransactionMutation, useAccountsQuery } from '@/api/graphql'
import { UpsertTransactionForm } from '@/components/transaction'
import { useToaster, useTreasuryBookContext } from '@/hooks'
import { addEntryDefaultValues } from '@/shared/zod/defaultValues'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'

export const InsertTransactionForm: React.FC = () => {
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
