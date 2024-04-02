import type { Branch } from '@/api/graphql'
import type { TreasuryBook as PrismaBranch } from '@prisma/client'

type TransformBranchArgs = PrismaBranch

export const transformBranch = ({
  ownerId,
  ...rest
}: TransformBranchArgs): Branch => ({
  ...rest,
  userId: ownerId,
})
