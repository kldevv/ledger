import { useCallback } from 'react'

export const useDate = () => {
  const format = useCallback((date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}/${month}/${day}`
  }, [])

  return { format } as const
}
