import { useMemo } from 'react'

import { useTagsQuery } from '@/api/graphql'
import { useCurrentBranch } from '@/components/core/hooks'
import { tagTypeToSolidIconName } from '@/shared/utils'

export const useTagsMultiSelect = () => {
  const [currentBranch] = useCurrentBranch()
  const { data: { tags } = {}, loading } = useTagsQuery({
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
        tags?.map(({ name, id, type }) => ({
          value: id,
          title: name,
          solidIcon: tagTypeToSolidIconName(type),
        })) ?? [],
    }),
    [loading, tags],
  )
}
