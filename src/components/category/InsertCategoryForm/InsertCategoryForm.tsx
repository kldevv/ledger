import { useAddCategoryMutation } from '@/api/graphql'
import type { FieldValues } from '..'
import { UpsertCategoryForm } from '..'
import { useCallback } from 'react'
import { useTranslation } from 'next-i18next'
import { useVaultContext } from '@/hooks'

export const InsertCategoryFrom: React.FC = () => {
  const { t } = useTranslation('category')
  const [{ curVaultId }] = useVaultContext()

  const [addCategory] = useAddCategoryMutation({
    onCompleted: (data) => console.log(data),
  })

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
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
