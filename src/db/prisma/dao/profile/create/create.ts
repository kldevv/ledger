import prisma from "@/db/prisma/client"

export namespace CreateOne {
  export type Args = {
    /**
     * Profile name
     */
    name: string
  }
}

export const createOne = async ({ name }: CreateOne.Args) => {
  try {
    await prisma.profile.create({
      data: {
        name,
      }
    })
  } catch (e) {
    throw e
  }
}