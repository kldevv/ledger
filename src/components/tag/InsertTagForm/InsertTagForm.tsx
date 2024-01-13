import { useTranslation } from 'next-i18next'
import { useCallback } from 'react'

import { useAddTagMutation } from '@/api/graphql'
import { UpsertTagForm } from '@/components/tag'
import { useTreasuryBookContext } from '@/hooks'

import type { UpsertTagFormFieldValues } from '@/components/tag'

export const InsertTagForm: React.FC = () => {
  const { t } = useTranslation('tag')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const [addTag] = useAddTagMutation({
    onCompleted: (data) => console.log(data),
  })

  const handleOnSubmit = useCallback(
    (values: UpsertTagFormFieldValues) => {
      if (selectedTreasuryBookId == null) {
        return
      }

      void addTag({
        variables: {
          input: {
            ...values,
            vaultId: selectedTreasuryBookId,
          },
        },
      })
    },
    [selectedTreasuryBookId, addTag],
  )

  return (
    <UpsertTagForm
      onSubmitText={t`InsertTagForm.submit`}
      onSubmit={handleOnSubmit}
    />
  )
}
