import prisma from "@/db/prisma/client"

export namespace DeleteOne {
  export type Args = {
    /**
     * Profile id
     */
    id: string
  }
}

export const deleteOne = async ({ id }: DeleteOne.Args) => {
  try {
    await prisma.profile.delete({
      where: {
        id,
      }
    })
  } catch (e) {
    throw e
  }
}