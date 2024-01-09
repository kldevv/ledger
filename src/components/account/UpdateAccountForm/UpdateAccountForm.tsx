import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useGetAccountQuery, useUpdateAccountMutation } from '@/api/graphql'
import { UpsertAccountForm } from '@/components/account'

import type { UpsertAccountFormFieldValues } from '@/components/account'

export const UpdateAccountForm: React.FC = () => {
  const { t } = useTranslation('account')
  const router = useRouter()

  const { id } = router.query
  const accountId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useGetAccountQuery({
    variables: {
      input: {
        id: accountId ?? '',
      },
    },
    skip: accountId == null,
  })

  const [updateAccount] = useUpdateAccountMutation()

  const values = useMemo(() => {
    if (data?.getAccount == null) {
      return undefined
    }

    return {
      name: data.getAccount.name,
      categoryId: data.getAccount.category?.id ?? '',
    }
  }, [data?.getAccount])

  const handleOnSubmit = useCallback(
    (values: UpsertAccountFormFieldValues) => {
      if (data?.getAccount == null) {
        return
      }

      void updateAccount({
        variables: {
          input: {
            id: data.getAccount.id,
            ...values,
          },
        },
      })
    },
    [updateAccount, data?.getAccount],
  )

  return (
    <UpsertAccountForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateAccountForm.submit`}
      values={values}
    />
  )
}
