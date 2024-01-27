import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddAccountMutation, useGetCategoriesQuery } from '@/api/graphql'
import { UpsertAccountForm } from '@/components/account'
import { useTreasuryBookContext } from '@/hooks'

import type { UpsertAccountFormFieldValues } from '@/components/account'

export const InsertAccountFrom: React.FC = () => {
  const { t } = useTranslation('account')
  const { selectedTreasuryBookId } = useTreasuryBookContext()

  const [addAccount] = useAddAccountMutation({
    onCompleted: (data) => console.log(data),
  })

  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const values = useMemo(() => {
    if (data?.getCategories[0] == null) {
      return undefined
    }

    return {
      name: '',
      categoryId: data?.getCategories[0]?.id,
    }
  }, [data?.getCategories])

  const handleOnSubmit = useCallback(
    (values: UpsertAccountFormFieldValues) => {
      if (selectedTreasuryBookId == null) {
        return
      }

      void addAccount({
        variables: {
          input: {
            ...values,
            treasuryBookId: selectedTreasuryBookId,
          },
        },
      })
    },
    [selectedTreasuryBookId, addAccount],
  )

  return (
    <UpsertAccountForm
      onSubmitText={t`InsertAccountFrom.submit`}
      onSubmit={handleOnSubmit}
      values={values}
    />
  )
}
