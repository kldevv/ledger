import { TreasuryBook } from '@/api/graphql'
import { createContext } from 'react'

type CurrentBranch = TreasuryBook

type SetCurrentBranch = (newBranch: TreasuryBook) => void

export const CurrentBranchContext = createContext<
  [CurrentBranch | undefined, SetCurrentBranch]
>([undefined, () => null])
