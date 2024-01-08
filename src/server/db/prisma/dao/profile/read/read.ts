import prisma from '@/server/db/prisma/client'

import type { Profile } from '@prisma/client'

export namespace ReadOne {
  export type Args = {
    /**
     * Profile id
     */
    id: string
  }

  export type Returns = Profile | null
}

export const readOne = async ({
  id,
}: ReadOne.Args): Promise<ReadOne.Returns> => {
  try {
    return await prisma.profile.findUnique({
      where: {
        id,
      },
    })
  } catch (e) {
    throw e
  }
}

export namespace ReadMany {
  export type Args = {
    /**
     * Profile name
     */
    name?: string
  }

  export type Returns = Profile[]
}

export const readMany = async ({
  name,
}: ReadMany.Args): Promise<ReadMany.Returns> => {
  try {
    return await prisma.profile.findMany({
      where: {
        id,
        name,
      },
    })
  } catch (e) {
    throw e
  }
}
