import prisma from '@/server/db/prisma/client/client'
import { Profile } from '@prisma/client'

export namespace DeleteOne {
  export type Args = {
    /**
     * Profile id
     */
    id: string
  }

  export type Returns = Profile
}

export const deleteOne = async ({
  id,
}: DeleteOne.Args): Promise<DeleteOne.Returns> => {
  try {
    return await prisma.profile.delete({
      where: {
        id,
      },
    })
  } catch (e) {
    throw e
  }
}
