import type { Branch } from '@/api/graphql'
import type { findTreasuryBooks } from '@/server/db/prisma/dao/treasuryBook'

export const tBranch = (
  branch: Awaited<ReturnType<typeof findTreasuryBooks>>[number],
): Branch => ({
  ...branch,
  userId: branch.ownerId,
})
