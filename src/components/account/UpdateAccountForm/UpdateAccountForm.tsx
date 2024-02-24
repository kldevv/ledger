import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo } from 'react'

import { useAccountQuery, useUpdateAccountMutation } from '@/api/graphql'
import { UpsertAccountForm } from '@/components/account'

import type { UpsertAccountFormFieldValues } from '@/components/account'

export const UpdateAccountForm: React.FC = () => {
  const { t } = useTranslation('account')
  const router = useRouter()

  const { id } = router.query
  const accountId = useMemo(() => {
    return id == null || Array.isArray(id) ? null : id
  }, [id])

  const { data } = useAccountQuery({
    variables: {
      input: {
        id: accountId ?? '',
      },
    },
    skip: accountId == null,
  })

  const [updateAccount] = useUpdateAccountMutation()

  const values = useMemo(() => {
    if (data?.account == null) {
      return undefined
    }

    return {
      name: data.account.name,
      categoryId: data.account.category?.id ?? '',
    }
  }, [data?.account])

  const handleOnSubmit = useCallback(
    (values: UpsertAccountFormFieldValues) => {
      if (data?.account == null) {
        return
      }

      void updateAccount({
        variables: {
          input: {
            id: data.account.id,
            ...values,
          },
        },
      })
    },
    [updateAccount, data?.account],
  )

  return (
    <UpsertAccountForm
      onSubmit={handleOnSubmit}
      onSubmitText={t`UpdateAccountForm.submit`}
      values={values}
    />
  )
}
