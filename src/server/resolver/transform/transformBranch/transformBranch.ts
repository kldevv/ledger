import type { Branch } from '@/api/graphql'
import type { findBranches } from '@/server/db/prisma/dao/branch'

export const transformBranch = ({
  ownerId,
  ...rest
}: Awaited<ReturnType<typeof findBranches>>[number]): Branch => ({
  ...rest,
  userId: ownerId,
})
