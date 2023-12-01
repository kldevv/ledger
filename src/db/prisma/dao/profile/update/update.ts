import prisma from "@/db/prisma/client"

export namespace Update {
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

export const update = async ({ id, data }: Update.Args) => {
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