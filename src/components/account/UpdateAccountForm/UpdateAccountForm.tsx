import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAccountQuery, useUpdateAccountMutation } from '@/api/graphql'
import { AccountForm } from '@/components/account'
import { useResolvedQuery, useToaster } from '@/hooks'

import type { AccountFormFieldValues } from '@/components/account'

export const UpdateAccountForm: React.FC = () => {
  const { t } = useTranslation('account')
  const id = useResolvedQuery('id', '')
  const toast = useToaster()

  const { data: { account } = {} } = useAccountQuery({
    variables: {
      input: {
        id: id ?? '',
      },
    },
    skip: id == null,
  })

  const [updateAccount] = useUpdateAccountMutation({
    onCompleted: () => toast(t`UpdateAccountForm.success`),
  })

  const values = useMemo(
    () => ({
      name: account?.name ?? '',
      categoryId: account?.category?.id ?? '',
    }),
    [account?.category?.id, account?.name],
  )

  const handleOnSubmit = useCallback(
    (values: AccountFormFieldValues) => {
      void updateAccount({
        variables: {
          input: {
            id: account?.id ?? '',
            ...values,
          },
        },
      })
    },
    [updateAccount, account?.id],
  )

  return (
    <AccountForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateAccountForm.submit`}
      values={values}
    />
  )
}
