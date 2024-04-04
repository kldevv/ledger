import { createContext } from 'react'

import type { Branch } from '@/api/graphql'

type CurrentBranch = undefined | Branch

type SetCurrentBranch = (newBranch: Branch | undefined) => void

export const CurrentBranchContext = createContext<
  [CurrentBranch, SetCurrentBranch]
>([undefined, () => null])
