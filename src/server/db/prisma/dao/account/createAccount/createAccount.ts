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
      treasuryBook: { connect: { id: branchId } },
      category: { connect: { id: accountGroupId } },
    },
    include: {
      category: true,
      _count: {
        select: {
          entries: true,
        },
      },
    },
  })
}
