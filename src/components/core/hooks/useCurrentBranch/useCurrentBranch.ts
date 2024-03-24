import { useContext } from 'react'

import { CurrentBranchContext } from './context'

export * from './provider'

export const useCurrentBranch = () => useContext(CurrentBranchContext)
