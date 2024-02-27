import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddTreasuryBookMutation } from '@/api/graphql'
import { TreasuryBookForm } from '@/components/treasuryBook'
import { useToaster, useTreasuryBookContext } from '@/hooks'

import type { TreasuryBookFormFieldValues } from '@/components/treasuryBook'

export const AddTreasuryBookForm: React.FC = () => {
  const { t } = useTranslation('treasuryBook')
  const toast = useToaster()

  const { ownerId } = useTreasuryBookContext()

  const [addTreasuryBook] = useAddTreasuryBookMutation({
    onCompleted: () => toast(t`AddTreasuryBookForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TreasuryBookFormFieldValues) => {
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
    <TreasuryBookForm
      onSubmitText={t`AddTreasuryBookForm.submit`}
      onSubmit={handleOnSubmit}
    />
  )
}
