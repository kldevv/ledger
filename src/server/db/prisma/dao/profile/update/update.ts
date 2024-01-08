import prisma from '@/server/db/prisma/client'

export namespace UpdateOne {
  export type Args = {
    /**
     * Profile id
     */
    id: string
    /**
     * Update data
     */
    data: Data
  }

  export type Data = {
    /**
     * New profile name
     */
    name?: string
  }
}

export const updateOne = async ({ id, data }: UpdateOne.Args) => {
  try {
    await prisma.profile.update({
      where: {
        id,
      },
      data,
    })
  } catch (e) {
    throw e
  }
}
