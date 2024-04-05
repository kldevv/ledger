import { useMemo } from 'react'

import { useAccountGroupsQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'

export const useAccountGroupDropdown = () => {
  const [currentBranch] = useCurrentBranch()
  const { data: { accountGroups } = {}, loading } = useAccountGroupsQuery({
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
        accountGroups?.map(({ id, name }) => ({
          value: id,
          title: name,
          desc: id,
        })) ?? [],
    }),
    [accountGroups, loading],
  )
}
