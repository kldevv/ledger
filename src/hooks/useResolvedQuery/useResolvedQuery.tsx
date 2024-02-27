import { useRouter } from 'next/router'

export const useResolvedQuery = (x: string) => {
  const { query } = useRouter()

  const y = query[x]

  return Array.isArray(y) ? y?.at(0) ?? undefined : y
}
