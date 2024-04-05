import prisma from '../../../client'

export interface FindAccountGroupArgs {
  /**
   * Account group id
   */
  id: string
}

export const findAccountGroup = async ({ id }: FindAccountGroupArgs) => {
  return await prisma.category.findUnique({
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
