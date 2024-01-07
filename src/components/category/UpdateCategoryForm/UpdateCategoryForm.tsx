import { useGetCategoryQuery, useUpdateCategoryMutation } from '@/api/graphql'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import type { FieldValues } from '..'
import { UpsertCategoryForm } from '..'
import { useTranslation } from 'next-i18next'

export const UpdateCategoryForm: React.FC = () => {
  const { t } = useTranslation('category')
  const router = useRouter()
  const { id } = router.query

  const categoryId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetCategoryQuery({
    variables: {
      input: {
        id: categoryId ?? '',
      },
    },
    skip: categoryId == null,
  })

  const [updateCategory] = useUpdateCategoryMutation()

  const values = useMemo(() => {
    if (data?.getCategory == null) {
      return undefined
    }

    return {
      name: data?.getCategory.name,
      type: data?.getCategory.type,
    }
  }, [data?.getCategory])

  const handleOnSubmit = useCallback(
    (values: FieldValues) => {
      if (data?.getCategory == null) {
        return
      }

      void updateCategory({
        variables: {
          input: {
            id: data.getCategory.id,
            ...values,
          },
        },
      })
    },
    [data?.getCategory, updateCategory],
  )

  return (
    <UpsertCategoryForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateCategoryForm.submit`}
      values={values}
    />
  )
}
