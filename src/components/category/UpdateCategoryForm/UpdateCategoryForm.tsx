import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import {
  CategoryType,
  useCategoryQuery,
  useUpdateCategoryMutation,
} from '@/api/graphql'
import { CategoryForm } from '@/components/category'
import { useResolvedQuery, useToaster } from '@/hooks'

import type { CategoryFormFieldValues } from '@/components/category'

export const UpdateCategoryForm: React.FC = () => {
  const { t } = useTranslation('accountGroup')
  const id = useResolvedQuery('id')
  const toast = useToaster()

  const { data: { category } = {} } = useCategoryQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const [updateCategory] = useUpdateCategoryMutation({
    onCompleted: () => toast(t`UpdateCategoryForm.success`),
  })

  const values = useMemo(() => {
    return {
      name: category?.name ?? '',
      type: category?.type ?? CategoryType.ASSETS,
    }
  }, [category?.name, category?.type])

  const handleOnSubmit = useCallback(
    (values: CategoryFormFieldValues) => {
      if (category?.id == null) return

      void updateCategory({
        variables: {
          input: {
            id: category?.id ?? '',
            ...values,
          },
        },
      })
    },
    [category?.id, updateCategory],
  )

  return (
    <CategoryForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateCategoryForm.submit`}
      values={values}
    />
  )
}
