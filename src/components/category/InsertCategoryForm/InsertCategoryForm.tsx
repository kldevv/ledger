import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddCategoryMutation } from '@/api/graphql'
import { UpsertCategoryForm } from '@/components/category'
import { useVaultContext } from '@/hooks'

import type { UpsertCategoryFormFieldValues } from '@/components/category'

export const InsertCategoryFrom: React.FC = () => {
  const { t } = useTranslation('category')
  const [{ curVaultId }] = useVaultContext()

  const [addCategory] = useAddCategoryMutation({
    onCompleted: (data) => console.log(data),
  })

  const handleOnSubmit = useCallback(
    (values: UpsertCategoryFormFieldValues) => {
      if (curVaultId == null) {
        return
      }

      void addCategory({
        variables: {
          input: {
            ...values,
            vaultId: curVaultId,
          },
        },
      })
    },
    [curVaultId, addCategory],
  )

  return (
    <UpsertCategoryForm
      onSubmitText={t`InsertCategoryFrom.submit`}
      onSubmit={handleOnSubmit}
    />
  )
}
