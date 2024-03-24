import { createContext } from 'react'

import type { TreasuryBook } from '@/api/graphql'

type CurrentBranch = TreasuryBook | undefined

type SetCurrentBranch = (newBranch: TreasuryBook | undefined) => void

export const CurrentBranchContext = createContext<
  [CurrentBranch, SetCurrentBranch]
>([undefined, () => null])
