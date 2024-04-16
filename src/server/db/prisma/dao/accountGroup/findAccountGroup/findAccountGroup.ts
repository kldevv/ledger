import prisma from '../../../client'

export interface FindAccountGroupArgs {
  /**
   * Account group id
   */
  id: string
}

export const findAccountGroup = async ({ id }: FindAccountGroupArgs) => {
  return await prisma.accountGroup.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          accounts: true,
        },
      },
    },
  })
}
