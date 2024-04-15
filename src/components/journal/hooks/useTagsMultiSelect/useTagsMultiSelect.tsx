import { useMemo } from 'react'

import { useTagsQuery } from '@/api/graphql'
import { tagTypeToSolidIconName } from '@/shared/utils'

export const useTagsMultiSelect = (branchId: string | null) => {
  const { data: { tags } = {}, loading } = useTagsQuery({
    variables: {
      input: {
        branchId: branchId ?? '',
      },
    },
    skip: branchId == null,
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
