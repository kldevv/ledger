import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'

import { useGetAccountsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'
import {
  addEntryDefaultValues,
  addExchangeDefaultValues,
  addExchangeTransactionDefaultValues,
} from '@/lib'

import { UpsertExchangeForm } from '..'

export const InsertExchangeForm: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { selectedTreasuryBookId, data: treasuryBookQueryData } =
    useTreasuryBookContext()

  const { data } = useGetAccountsQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const values = useMemo(() => {
    const firstAccount = data?.getAccounts.at(0)

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
  }, [data?.getAccounts, treasuryBookQueryData])

  return (
    <UpsertExchangeForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`InsertExchangeForm.submit`}
      values={values}
    />
  )
}
