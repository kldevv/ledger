import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { Currency, useAddTreasuryBookMutation } from '@/api/graphql'
import { UpsertTreasuryBookForm } from '@/components/treasuryBook'

import type { UpsertTreasuryBookFormFieldValues } from '@/components/treasuryBook'

const defaultValues = {
  name: '',
  currency: Currency.USD,
}

export const InsertTreasuryBookForm: React.FC = () => {
  const { t } = useTranslation('treasuryBook')

  const [addTreasuryBook] = useAddTreasuryBookMutation({
    onCompleted: (data) => console.log(data),
  })

  const handleOnSubmit = useCallback(
    (values: UpsertTreasuryBookFormFieldValues) => {
      void addTreasuryBook({
        variables: {
          input: {
            ...values,
            ownerId:
              process.env.PROFILE_ID ?? 'ce4a7c81-6404-4098-a763-64550c4ec902',
          },
        },
      })
    },
    [addTreasuryBook],
  )

  return (
    <UpsertTreasuryBookForm
      onSubmitText={t`InsertTreasuryBookForm.submit`}
      onSubmit={handleOnSubmit}
      defaultValues={defaultValues}
    />
  )
}
