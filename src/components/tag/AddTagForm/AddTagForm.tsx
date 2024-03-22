import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddTagMutation } from '@/api/graphql'
import { TagForm } from '@/components/tag'
import { useToaster } from '@/hooks'

import type { TagFormFieldValues } from '@/components/tag'
import { useCurrentBranch } from '@/components/core/hooks'

export const AddTagForm: React.FC = () => {
  const { t } = useTranslation('tag')
  const [currentBranch] = useCurrentBranch()
  const toast = useToaster()

  const [addTag] = useAddTagMutation({
    onCompleted: () => toast(t`AddTagForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TagFormFieldValues) => {
      if (!currentBranch?.id) return

      void addTag({
        variables: {
          input: {
            ...values,
            treasuryBookId: currentBranch?.id,
          },
        },
      })
    },
    [currentBranch?.id, addTag],
  )

  return (
    <TagForm onSubmitText={t`AddTagForm.submit`} onSubmit={handleOnSubmit} />
  )
}
