import { useEffect, useState } from 'react'

import { useBranchesQuery } from '@/api/graphql'

import { CurrentBranchContext } from './context'

import type { Branch } from '@/api/graphql'

export const CurrentBranchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentBranch, setCurrentBranch] = useState<Branch>()

  const { data } = useBranchesQuery({
    variables: {
      input: {
        active: true,
      },
    },
  })

  useEffect(() => {
    setCurrentBranch(data?.branches?.at(0))
  }, [data?.branches])

  return (
    <CurrentBranchContext.Provider value={[currentBranch, setCurrentBranch]}>
      {children}
    </CurrentBranchContext.Provider>
  )
}
