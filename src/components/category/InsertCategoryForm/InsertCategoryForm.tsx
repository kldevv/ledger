import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddCategoryMutation } from '@/api/graphql'
import { UpsertCategoryForm } from '@/components/category'
import { useTreasuryBookContext } from '@/hooks'

import type { UpsertCategoryFormFieldValues } from '@/shared'

export const InsertCategoryFrom: React.FC = () => {
  const { t } = useTranslation('category')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const [addCategory] = useAddCategoryMutation({
    onCompleted: (data) => console.log(data),
  })

  const handleOnSubmit = useCallback(
    (values: UpsertCategoryFormFieldValues) => {
      if (selectedTreasuryBookId == null) {
        return
      }

      void addCategory({
        variables: {
          input: {
            ...values,
            treasuryBookId: selectedTreasuryBookId,
          },
        },
      })
    },
    [selectedTreasuryBookId, addCategory],
  )

  return (
    <UpsertCategoryForm
      onSubmitText={t`InsertCategoryFrom.submit`}
      onSubmit={handleOnSubmit}
    />
  )
}
