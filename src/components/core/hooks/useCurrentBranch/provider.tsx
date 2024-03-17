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
        ownerId: process.env.OWNER_ID ?? '',
      },
    },
    onCompleted: (data) => {
      setCurrentBranch(data.treasuryBooks?.at(0))
    },
    skip: !process.env.OWNER_ID,
  })

  return (
    <CurrentBranchContext.Provider value={[currentBranch, setCurrentBranch]}>
      {children}
    </CurrentBranchContext.Provider>
  )
}
