import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddTreasuryBookMutation } from '@/api/graphql'
import { TreasuryBookForm } from '@/components/treasuryBook'
import { useToaster } from '@/hooks'

import type { TreasuryBookFormFieldValues } from '@/components/treasuryBook'

export const AddTreasuryBookForm: React.FC = () => {
  const { t } = useTranslation('branch')
  const toast = useToaster()

  const [addTreasuryBook] = useAddTreasuryBookMutation({
    onCompleted: () => toast(t`AddTreasuryBookForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TreasuryBookFormFieldValues) => {
      void addTreasuryBook({
        variables: {
          input: {
            ...values,
            ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
          },
        },
      })
    },
    [addTreasuryBook],
  )

  return (
    <TreasuryBookForm
      onSubmitText={t`AddTreasuryBookForm.submit`}
      onSubmit={handleOnSubmit}
    />
  )
}
