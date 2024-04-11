import { useMemo } from 'react'

import { useLinksQuery } from '@/api/graphql'

export const useLinksMultiSelect = () => {
  const { data: { links } = {}, loading } = useLinksQuery({
    variables: {
      input: {
        userId: '81087108-3748-446a-b033-a85d7c9ace7b',
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
