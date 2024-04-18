import { useMemo } from 'react'

import { useLinksQuery } from '@/api/graphql'

export const useLinksMultiSelect = () => {
  const { data: { links } = {}, loading } = useLinksQuery({
    variables: {
      input: {
        userId: process.env.NEXT_PUBLIC_USER_ID ?? '',
      },
    },
  })

  return useMemo(
    () => ({
      loading,
      items:
        links?.map(({ name, id }) => ({
          value: id,
          title: name,
        })) ?? [],
    }),
    [links, loading],
  )
}
