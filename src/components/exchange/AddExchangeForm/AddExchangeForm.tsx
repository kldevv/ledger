import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddExchangeMutation } from '@/api/graphql'
import { entryFieldDefaultValues } from '@/components/entry/EntryFields'
import { useAccountsContext, useTreasuryBookContext } from '@/hooks'
import { parseCurrencyNumericFormat } from '@/shared'
import {
  addExchangeDefaultValues,
  addExchangeTransactionDefaultValues,
} from '@/shared/zod/defaultValues'

import { ExchangeForm } from '..'

import type { ExchangeFormFieldValues } from '..'

export const AddExchangeForm: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { ownerId, data: treasuryBookQueryData } = useTreasuryBookContext()
  const { data: { accounts } = {} } = useAccountsContext()

  const [addExchange] = useAddExchangeMutation()

  const handleOnSubmit = useCallback(
    (values: ExchangeFormFieldValues) => {
      void addExchange({
        variables: {
          input: {
            ...values,
            origin: {
              ...values.origin,
              entries: values.origin.entries.map((entry) => ({
                ...entry,
                // remove currency numeric format
                debit: parseCurrencyNumericFormat(entry.debit),
                // remove currency numeric format
                credit: parseCurrencyNumericFormat(entry.credit),
              })),
            },
            destination: {
              ...values.destination,
              entries: values.destination.entries.map((entry) => ({
                ...entry,
                // remove currency numeric format
                debit: parseCurrencyNumericFormat(entry.debit),
                // remove currency numeric format
                credit: parseCurrencyNumericFormat(entry.credit),
              })),
            },
            ownerId,
          },
        },
      })
    },
    [addExchange, ownerId],
  )

  const values = useMemo(() => {
    const entry = {
      ...entryFieldDefaultValues,
      accountId: accounts?.at(0)?.id ?? '',
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
  }, [accounts, treasuryBookQueryData?.treasuryBooks])

  return (
    <ExchangeForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`AddExchangeForm.submit`}
      values={values}
    />
  )
}
