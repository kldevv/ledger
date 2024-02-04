import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddExchangeMutation } from '@/api/graphql'
import { useAccountsContext, useTreasuryBookContext } from '@/hooks'
import {
  addEntryDefaultValues,
  addExchangeDefaultValues,
  addExchangeTransactionDefaultValues,
} from '@/lib'

import { UpsertExchangeForm } from '..'

import type { UpsertExchangeFormFieldValues } from '@/lib'

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
    const firstAccount = accountsQueryData?.getAccounts.at(0)

    if (firstAccount == null) {
      return undefined
    }

    const entry = {
      ...addEntryDefaultValues,
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
        treasuryBookId: treasuryBookQueryData?.getTreasuryBooks.at(0)?.id ?? '',
      },
      destination: {
        ...transaction,
        treasuryBookId: treasuryBookQueryData?.getTreasuryBooks.at(1)?.id ?? '',
      },
    }
  }, [accountsQueryData?.getAccounts, treasuryBookQueryData?.getTreasuryBooks])

  return (
    <UpsertExchangeForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`InsertExchangeForm.submit`}
      values={values}
    />
  )
}
