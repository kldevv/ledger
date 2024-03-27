import { createContext } from 'react'

import type { Branch, TreasuryBook } from '@/api/graphql'

type CurrentBranch = TreasuryBook | undefined | Branch

type SetCurrentBranch = (newBranch: TreasuryBook | Branch | undefined) => void

export const CurrentBranchContext = createContext<
  [CurrentBranch, SetCurrentBranch]
>([undefined, () => null])
