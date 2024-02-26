import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddAccountMutation, useCategoriesQuery } from '@/api/graphql'
import { AccountForm } from '@/components/account'
import { useToaster, useTreasuryBookContext } from '@/hooks'

import type { AccountFormFieldValues } from '@/components/account'

export const AddAccountFrom: React.FC = () => {
  const { t } = useTranslation('account')
  const { selectedTreasuryBookId } = useTreasuryBookContext()
  const toast = useToaster()

  const [addAccount] = useAddAccountMutation({
    onCompleted: () => toast(t`AddAccountFrom.success`),
  })

  const { data: { categories } = {} } = useCategoriesQuery({
    variables: {
      input: {
        treasuryBookId: selectedTreasuryBookId ?? '',
      },
    },
    skip: selectedTreasuryBookId == null,
  })

  const values = useMemo(
    () => ({
      name: '',
      categoryId: categories?.at(0)?.id ?? '',
    }),
    [categories],
  )

  const handleOnSubmit = useCallback(
    (values: AccountFormFieldValues) => {
      void addAccount({
        variables: {
          input: {
            ...values,
            treasuryBookId: selectedTreasuryBookId ?? '',
          },
        },
      })
    },
    [selectedTreasuryBookId, addAccount],
  )

  return (
    <AccountForm
      onSubmitText={t`AddAccountFrom.submit`}
      onSubmit={handleOnSubmit}
      values={values}
    />
  )
}
