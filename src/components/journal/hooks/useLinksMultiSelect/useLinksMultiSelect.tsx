import { useSession } from 'next-auth/react'
import { useMemo } from 'react'

import { useLinksQuery } from '@/api/graphql'

export const useLinksMultiSelect = () => {
  const { data: session } = useSession()
  const { data: { links } = {}, loading } = useLinksQuery({
    variables: {
      input: {
        userId: session?.user.id ?? '',
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
