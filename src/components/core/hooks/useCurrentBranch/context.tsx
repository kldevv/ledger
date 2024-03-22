import { TreasuryBook } from '@/api/graphql'
import { createContext } from 'react'

type CurrentBranch = TreasuryBook | undefined

type SetCurrentBranch = (newBranch: TreasuryBook | undefined) => void

export const CurrentBranchContext = createContext<
  [CurrentBranch, SetCurrentBranch]
>([undefined, () => null])
