import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAddAccountMutation, useCategoriesQuery } from '@/api/graphql'
import { AccountForm } from '@/components/account'
import { useToaster } from '@/hooks'

import type { AccountFormFieldValues } from '@/components/account'
import { useCurrentBranch } from '@/components/core/hooks'

export const AddAccountFrom: React.FC = () => {
  const { t } = useTranslation('account')
  const [currentBranch] = useCurrentBranch()
  const toast = useToaster()

  const [addAccount] = useAddAccountMutation({
    onCompleted: () => toast(t`AddAccountFrom.success`),
  })

  const { data: { categories } = {} } = useCategoriesQuery({
    variables: {
      input: {
        treasuryBookId: currentBranch?.id ?? '',
      },
    },
    skip: !currentBranch?.id,
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
            treasuryBookId: currentBranch?.id ?? '',
          },
        },
      })
    },
    [currentBranch?.id, addAccount],
  )

  return (
    <AccountForm
      onSubmitText={t`AddAccountFrom.submit`}
      onSubmit={handleOnSubmit}
      values={values}
    />
  )
}
