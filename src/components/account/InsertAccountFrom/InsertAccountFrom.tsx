import { useAddAccountMutation, useGetCategoriesQuery } from '@/api/graphql'
import type { FieldValues } from '..'
import { UpsertAccountForm } from '..'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { useVaultContext } from '@/hooks'

export const InsertAccountFrom: React.FC = () => {
  const { t } = useTranslation('account')
  const [{ curVaultId }] = useVaultContext()

  const [addAccount] = useAddAccountMutation({
    onCompleted: (data) => console.log(data),
  })

  const { data } = useGetCategoriesQuery({
    variables: {
      input: {
        vaultId: curVaultId ?? '',
      },
    },
    skip: curVaultId == null,
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
    (values: FieldValues) => {
      if (curVaultId == null) {
        return
      }

      void addAccount({
        variables: {
          input: {
            ...values,
            vaultId: curVaultId,
          },
        },
      })
    },
    [curVaultId, addAccount],
  )

  return (
    <UpsertAccountForm
      onSubmitText={t`InsertAccountFrom.submit`}
      onSubmit={handleOnSubmit}
      values={values}
    />
  )
}
