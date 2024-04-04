import { useState } from 'react'

import { useBranchesQuery } from '@/api/graphql'

import { CurrentBranchContext } from './context'

import type { Branch } from '@/api/graphql'

export interface CurrentBranchProviderProps {
  children: React.ReactNode
}

export const CurrentBranchProvider: React.FC<CurrentBranchProviderProps> = ({
  children,
}) => {
  const [currentBranch, setCurrentBranch] = useState<Branch>()

  useBranchesQuery({
    variables: {
      input: {
        userId: '81087108-3748-446a-b033-a85d7c9ace7b',
      },
    },
    onCompleted: (data) => {
      setCurrentBranch(data.branches?.at(0))
    },
  })

  return (
    <CurrentBranchContext.Provider value={[currentBranch, setCurrentBranch]}>
      {children}
    </CurrentBranchContext.Provider>
  )
}
