import { createContext } from 'react'

import type { Branch } from '@/api/graphql'

export type CurrentBranch = undefined | Branch

export type SetCurrentBranch = (newBranch: Branch | undefined) => void

export const CurrentBranchContext = createContext<
  [CurrentBranch, SetCurrentBranch]
>([undefined, () => null])
