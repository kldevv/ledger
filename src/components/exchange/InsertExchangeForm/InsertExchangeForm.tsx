import { useMemo } from 'react'
import { UpsertExchangeForm } from '..'
import {
  addEntryDefaultValues,
  addExchangeDefaultValues,
  addExchangeTransactionDefaultValues,
} from '@/lib'
import { useGetAccountsQuery } from '@/api/graphql'
import { useTreasuryBookContext } from '@/hooks'
import { useTranslation } from 'next-i18next'

export const InsertExchangeForm: React.FC = () => {
  const { t } = useTranslation('exchange')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

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
      origin: transaction,
      destination: transaction,
    }
  }, [data?.getAccounts])

  return (
    <UpsertExchangeForm
      onSubmit={(value) => console.log(value)}
      onSubmitText={t`InsertExchangeForm.submit`}
      values={values}
    />
  )
}
