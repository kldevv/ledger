import { useMemo, useState } from 'react'

import { useGetTreasuryBooksQuery } from '@/api/graphql'

import { TreasuryBookContext } from './TreasuryBookContext'

export interface TreasuryBookContextProviderProps {
  /**
   * Children component
   */
  children: React.ReactNode
}

export const TreasuryBookContextProvider: React.FC<
  TreasuryBookContextProviderProps
> = ({ children }) => {
  const [selectedTreasuryBookId, setSelectedTreasuryBookId] =
    useState<TreasuryBookContext['selectedTreasuryBookId']>(undefined)

  const { data, loading, error } = useGetTreasuryBooksQuery({
    variables: {
      input: {
        ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
    onCompleted: (data) => {
      setSelectedTreasuryBookId(data.getTreasuryBooks?.[0].id)
    },
  })

  const context = useMemo(
    () => ({
      selectedTreasuryBookId,
      setSelectedTreasuryBookId,
      data,
      state: {
        loading,
        error,
      },
    }),
    [data, error, loading, selectedTreasuryBookId],
  )

  return (
    <TreasuryBookContext.Provider value={context}>
      {children}
    </TreasuryBookContext.Provider>
  )
}
