import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddCategoryMutation } from '@/api/graphql'
import { CategoryForm } from '@/components/category'
import { useToaster } from '@/hooks'

import type { CategoryFormFieldValues } from '@/components/category'
import { useCurrentBranch } from '@/components/core/hooks'

export const AddCategoryFrom: React.FC = () => {
  const { t } = useTranslation('accountGroup')
  const [currentBranch] = useCurrentBranch()
  const toast = useToaster()

  const [addCategory] = useAddCategoryMutation({
    onCompleted: () => toast(t`AddCategoryFrom.success`),
  })

  const handleOnSubmit = useCallback(
    (values: CategoryFormFieldValues) => {
      if (!currentBranch) return

      void addCategory({
        variables: {
          input: {
            ...values,
            treasuryBookId: currentBranch.id,
          },
        },
      })
    },
    [currentBranch?.id, addCategory],
  )

  return (
    <CategoryForm
      onSubmitText={t`AddCategoryFrom.submit`}
      onSubmit={handleOnSubmit}
    />
  )
}
