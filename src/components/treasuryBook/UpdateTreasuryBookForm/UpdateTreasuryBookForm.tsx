import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useUpdateTreasuryBookMutation } from '@/api/graphql'
import { TreasuryBookForm } from '@/components/treasuryBook'
import { useResolvedQuery, useToaster, useTreasuryBookContext } from '@/hooks'

import type { TreasuryBookFormFieldValues } from '@/components/treasuryBook'

export const UpdateTreasuryBookForm: React.FC = () => {
  const { t } = useTranslation('branch')
  const toast = useToaster()
  const id = useResolvedQuery('id')
  const { data: { treasuryBooks } = {} } = useTreasuryBookContext()

  const [addTreasuryBook] = useUpdateTreasuryBookMutation({
    onCompleted: () => toast(t`UpdateTreasuryBookForm.success`),
  })

  const handleOnSubmit = useCallback(
    (values: TreasuryBookFormFieldValues) => {
      if (id == null) return

      void addTreasuryBook({
        variables: {
          input: { id, ...values },
        },
      })
    },
    [addTreasuryBook, id],
  )

  const values = useMemo(
    () => treasuryBooks?.find((treasuryBook) => treasuryBook.id === id),
    [id, treasuryBooks],
  )

  return (
    <TreasuryBookForm
      onSubmitText={t`UpdateTreasuryBookForm.submit`}
      onSubmit={handleOnSubmit}
      values={values}
    />
  )
}
