import { TreasuryBook, useTreasuryBooksQuery } from '@/api/graphql'
import { CurrentBranchContext } from './context'
import { useState } from 'react'

export interface CurrentBranchProviderProps {
  children: React.ReactNode
}

export const CurrentBranchProvider: React.FC<CurrentBranchProviderProps> = ({
  children,
}) => {
  const [currentBranch, setCurrentBranch] = useState<TreasuryBook>()

  // Initial the the first branch to be the current branch
  useTreasuryBooksQuery({
    variables: {
      input: {
        ownerId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
    onCompleted: (data) => {
      setCurrentBranch(data.treasuryBooks?.at(0))
    },
  })

  return (
    <CurrentBranchContext.Provider value={[currentBranch, setCurrentBranch]}>
      {children}
    </CurrentBranchContext.Provider>
  )
}
