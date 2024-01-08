import prisma from '@/server/db/prisma/client'
import { Profile } from '@prisma/client'

export namespace CreateOne {
  export type Args = {
    /**
     * Profile name
     */
    name: string
  }

  export type Returns = Profile
}

export const createOne = async ({
  name,
}: CreateOne.Args): Promise<CreateOne.Returns> => {
  try {
    return await prisma.profile.create({
      data: {
        name,
      },
    })
  } catch (e) {
    throw e
  }
}
