import { useMemo } from 'react'

import { useAccountsQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'

export const useAccountDropdown = () => {
  const [currentBranch] = useCurrentBranch()
  const { data: { accounts } = {}, loading } = useAccountsQuery({
    variables: {
      input: {
        branchId: currentBranch?.id ?? '',
      },
    },
    skip: currentBranch == null,
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
