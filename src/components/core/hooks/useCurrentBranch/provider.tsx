import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { useBranchesQuery } from '@/api/graphql'

import { CurrentBranchContext } from './context'

import type { Branch } from '@/api/graphql'

export const CurrentBranchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentBranch, setCurrentBranch] = useState<Branch>()
  const { data: session } = useSession()

  useBranchesQuery({
    variables: {
      input: {
        userId: session?.user.id ?? '',
      },
    },
    onCompleted: (data) => {
      setCurrentBranch(data.branches?.at(0))
    },
    skip: session?.user.id == null,
  })

  return (
    <CurrentBranchContext.Provider value={[currentBranch, setCurrentBranch]}>
      {children}
    </CurrentBranchContext.Provider>
  )
}
