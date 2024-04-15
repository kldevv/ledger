import { useMemo } from 'react'

import { useAccountsQuery } from '@/api/graphql'

export const useAccountDropdown = (branchId: string | null) => {
  const { data: { accounts } = {}, loading } = useAccountsQuery({
    variables: {
      input: {
        branchId: branchId,
      },
    },
    skip: branchId == null,
  })

  return useMemo(
    () => ({
      loading,
      items:
        accounts?.map(({ name, id }) => ({
          value: id,
          title: name,
        })) ?? [],
    }),
    [accounts, loading],
  )
}
