import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useTagQuery, useUpdateTagMutation } from '@/api/graphql'
import { TagForm } from '@/components/tag'
import { useResolvedQuery, useToaster } from '@/hooks'

import type { TagFormFieldValues } from '@/components/tag'

export const UpdateTagForm: React.FC = () => {
  const { t } = useTranslation('tag')
  const id = useResolvedQuery('id')
  const toast = useToaster()

  const { data: { tag } = {} } = useTagQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const [updateTag] = useUpdateTagMutation({
    onCompleted: () => toast(t`UpdateTagForm.success`),
  })

  const values = useMemo(() => {
    return {
      name: tag?.name ?? '',
    }
  }, [tag])

  const handleOnSubmit = useCallback(
    (values: TagFormFieldValues) => {
      if (tag?.id == null) return

      void updateTag({
        variables: {
          input: {
            id: tag?.id,
            ...values,
          },
        },
      })
    },
    [tag?.id, updateTag],
  )

  return (
    <TagForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateTagForm.submit`}
      values={values}
    />
  )
}
