import { useRouter } from 'next/router'

export const useResolvedQuery = (x: string, defaultValue?: string) => {
  const { query } = useRouter()

  const y = query[x]

  if (y == null) return defaultValue

  return Array.isArray(y) ? y?.at(0) ?? defaultValue : y
}
