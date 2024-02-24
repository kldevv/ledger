import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useCategoryQuery, useUpdateCategoryMutation } from '@/api/graphql'
import { UpsertCategoryForm } from '@/components/category'

import type { UpsertCategoryFormFieldValues } from '@/shared'

export const UpdateCategoryForm: React.FC = () => {
  const { t } = useTranslation('category')
  const router = useRouter()

  const { id } = router.query
  const categoryId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useCategoryQuery({
    variables: {
      input: {
        id: categoryId ?? '',
      },
    },
    skip: categoryId == null,
  })

  const [updateCategory] = useUpdateCategoryMutation()

  const values = useMemo(() => {
    if (data?.category == null) {
      return undefined
    }

    return {
      name: data?.category.name,
      type: data?.category.type,
    }
  }, [data?.category])

  const handleOnSubmit = useCallback(
    (values: UpsertCategoryFormFieldValues) => {
      if (data?.category == null) {
        return
      }

      void updateCategory({
        variables: {
          input: {
            id: data.category.id,
            ...values,
          },
        },
      })
    },
    [data?.category, updateCategory],
  )

  return (
    <UpsertCategoryForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateCategoryForm.submit`}
      values={values}
    />
  )
}
