import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useGetTagQuery, useUpdateTagMutation } from '@/api/graphql'
import { UpsertTagForm } from '@/components/tag'

import type { UpsertTagFormFieldValues } from '@/components/tag'

export const UpdateTagForm: React.FC = () => {
  const { t } = useTranslation('tag')
  const router = useRouter()

  const { id } = router.query
  const tagId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetTagQuery({
    variables: {
      input: {
        id: tagId ?? '',
      },
    },
    skip: tagId == null,
  })

  const [updateTag] = useUpdateTagMutation()

  const values = useMemo(() => {
    if (data?.getTag == null) {
      return undefined
    }

    return {
      name: data.getTag.name,
    }
  }, [data?.getTag])

  const handleOnSubmit = useCallback(
    (values: UpsertTagFormFieldValues) => {
      if (data?.getTag == null) {
        return
      }

      void updateTag({
        variables: {
          input: {
            id: data.getTag.id,
            ...values,
          },
        },
      })
    },
    [data?.getTag, updateTag],
  )

  return (
    <UpsertTagForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateTagForm.submit`}
      values={values}
    />
  )
}
