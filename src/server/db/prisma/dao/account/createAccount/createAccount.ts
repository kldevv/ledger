import prisma from '@/server/db/prisma/client'

export interface CreateAccountArgs {
  /**
   * Account name
   */
  name: string
  /**
   * Account group id
   */
  accountGroupId: string
  /**
   * Branch id
   */
  branchId: string
}

export const createAccount = async ({
  name,
  branchId,
  accountGroupId,
}: CreateAccountArgs) => {
  return await prisma.account.create({
    data: {
      name,
      branch: { connect: { id: branchId } },
      accountGroup: { connect: { id: accountGroupId } },
    },
    include: {
      accountGroup: true,
      _count: {
        select: {
          entries: true,
        },
      },
    },
  })
}
