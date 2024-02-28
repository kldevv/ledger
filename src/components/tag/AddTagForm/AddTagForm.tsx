import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddTagMutation } from '@/api/graphql'
import { TagForm } from '@/components/tag'
import { useToaster, useTreasuryBookContext } from '@/hooks'

import type { TagFormFieldValues } from '@/components/tag'

export const AddTagForm: React.FC = () => {
  const { t } = useTranslation('tag')
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const toast = useToaster()

  const [addTag] = useAddTagMutation({
    onCompleted: () => toast(t`AddTagForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TagFormFieldValues) => {
      if (selectedTreasuryBookId == null) return

      void addTag({
        variables: {
          input: {
            ...values,
            treasuryBookId: selectedTreasuryBookId,
          },
        },
      })
    },
    [selectedTreasuryBookId, addTag],
  )

  return (
    <TagForm onSubmitText={t`AddTagForm.submit`} onSubmit={handleOnSubmit} />
  )
}