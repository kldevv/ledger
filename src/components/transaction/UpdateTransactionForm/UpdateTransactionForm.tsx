import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import {
  useTransactionDetailsQuery,
  useUpdateTransactionMutation,
} from '@/api/graphql'
import { UpsertTransactionForm } from '@/components/transaction'
import { useTreasuryBookContext } from '@/hooks'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'

export const UpdateTransactionForm: React.FC = () => {
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

  const [updateTransaction] = useUpdateTransactionMutation()

  const values = useMemo(() => {
    if (data?.transaction == null || data?.entries == null) {
      return undefined
    }

    const { accrualDate, note, tags } = data.transaction

    const entries = data.entries.map(
      ({ transactionDate, debit, credit, memo, status, account }) => ({
        transactionDate,
        debit,
        credit,
        accountId: account?.id ?? '',
        memo,
        status,
      }),
    )

    const tagIds = tags?.map(({ id }) => id) ?? []

    return {
      accrualDate,
      note,
      tagIds,
      entries,
    }
  }, [data])

  const handleOnSubmit = useCallback(
    (values: UpsertTransactionFormFieldValues) => {
      if (data?.transaction == null) {
        return
      }

      void updateTransaction({
        variables: {
          input: {
            id: data?.transaction?.id,
            treasuryBookId: data?.transaction.treasuryBookId,
            ...values,
          },
        },
      })
    },
    [data?.transaction, updateTransaction],
  )

  return (
    <UpsertTransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateTransactionForm.submit`}
      values={values}
    />
  )
}
