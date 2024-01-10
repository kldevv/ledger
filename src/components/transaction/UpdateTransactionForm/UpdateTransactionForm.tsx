import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import {
  useGetTransactionDetailQuery,
  useUpdateTransactionMutation,
} from '@/api/graphql'
import { UpsertTransactionForm } from '@/components/transaction'
import { useVaultContext } from '@/hooks'

import type { UpsertTransactionFormFieldValues } from '@/components/transaction'

export const UpdateTransactionForm: React.FC = () => {
  const { t } = useTranslation('transaction')
  const router = useRouter()
  const [{ curVaultId }] = useVaultContext()

  const { id } = router.query
  const transactionId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetTransactionDetailQuery({
    variables: {
      getTransactionInput: {
        id: transactionId ?? '',
      },
      getEntriesInput: {
        transactionId,
        vaultId: curVaultId ?? '',
      },
    },
    skip: transactionId == null || curVaultId == null,
  })

  const [updateTransaction] = useUpdateTransactionMutation()

  const values = useMemo(() => {
    if (data?.getTransaction == null || data?.getEntries == null) {
      return undefined
    }

    const { accrualDate, note, tags } = data.getTransaction

    const entries = data.getEntries.map(
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
      if (data?.getTransaction == null) {
        return
      }

      void updateTransaction({
        variables: {
          input: {
            id: data?.getTransaction?.id,
            vaultId: data?.getTransaction.vaultId,
            ...values,
          },
        },
      })
    },
    [data?.getTransaction, updateTransaction],
  )

  return (
    <UpsertTransactionForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateTransactionForm.submit`}
      values={values}
    />
  )
}
