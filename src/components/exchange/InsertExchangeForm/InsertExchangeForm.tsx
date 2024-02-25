import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddExchangeMutation } from '@/api/graphql'
import { entryFieldDefaultValues } from '@/components/transaction'
import { useAccountsContext, useTreasuryBookContext } from '@/hooks'
import {
  addExchangeDefaultValues,
  addExchangeTransactionDefaultValues,
} from '@/shared/zod/defaultValues'

import { UpsertExchangeForm } from '..'

import type { UpsertExchangeFormFieldValues } from '@/shared'

export const InsertExchangeForm: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { ownerId, data: treasuryBookQueryData } = useTreasuryBookContext()
  const { data: accountsQueryData } = useAccountsContext()

  const [addExchange] = useAddExchangeMutation()

  const handleOnSubmit = useCallback(
    (values: UpsertExchangeFormFieldValues) => {
      void addExchange({
        variables: {
          input: {
            ...values,
            ownerId,
          },
        },
      })
    },
    [addExchange, ownerId],
  )

  const values = useMemo(() => {
    const firstAccount = accountsQueryData?.accounts.at(0)

    if (firstAccount == null) {
      return undefined
    }

    const entry = {
      ...entryFieldDefaultValues,
      accountId: firstAccount.id,
    }

    const transaction = {
      ...addExchangeTransactionDefaultValues,
      entries: [entry, entry],
    }

    return {
      ...addExchangeDefaultValues,
      origin: {
        ...transaction,
        treasuryBookId: treasuryBookQueryData?.treasuryBooks.at(0)?.id ?? '',
      },
      destination: {
        ...transaction,
        treasuryBookId: treasuryBookQueryData?.treasuryBooks.at(1)?.id ?? '',
      },
    }
  }, [accountsQueryData?.accounts, treasuryBookQueryData?.treasuryBooks])

  return (
    <UpsertExchangeForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`InsertExchangeForm.submit`}
      values={values}
    />
  )
}
