import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddCategoryMutation } from '@/api/graphql'
import { CategoryForm } from '@/components/category'
import { useToaster, useTreasuryBookContext } from '@/hooks'

import type { CategoryFormFieldValues } from '@/components/category'

export const AddCategoryFrom: React.FC = () => {
  const { t } = useTranslation('category')
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const toast = useToaster()

  const [addCategory] = useAddCategoryMutation({
    onCompleted: () => toast(t`AddCategoryFrom.success`),
  })

  const handleOnSubmit = useCallback(
    (values: CategoryFormFieldValues) => {
      if (selectedTreasuryBookId == null) return

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
    <CategoryForm
      onSubmitText={t`AddCategoryFrom.submit`}
      onSubmit={handleOnSubmit}
    />
  )
}
