import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { Currency, useAddTreasuryBookMutation } from '@/api/graphql'
import { UpsertTreasuryBookForm } from '@/components/treasuryBook'
import { useTreasuryBookContext } from '@/hooks'

import type { UpsertTreasuryBookFormFieldValues } from '@/components/treasuryBook'

const defaultValues = {
  name: '',
  currency: Currency.USD,
}

export const InsertTreasuryBookForm: React.FC = () => {
  const { t } = useTranslation('treasuryBook')

  const { ownerId } = useTreasuryBookContext()

  const [addTreasuryBook] = useAddTreasuryBookMutation()

  const handleOnSubmit = useCallback(
    (values: UpsertTreasuryBookFormFieldValues) => {
      void addTreasuryBook({
        variables: {
          input: {
            ...values,
            ownerId,
          },
        },
      })
    },
    [addTreasuryBook, ownerId],
  )

  return (
    <UpsertTreasuryBookForm
      onSubmitText={t`InsertTreasuryBookForm.submit`}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  )
}
