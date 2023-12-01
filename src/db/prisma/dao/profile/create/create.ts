import prisma from "@/db/prisma/client"

export namespace Create {
  export type Args = {
    /**
     * Profile name
     */
    name: string
  }
}

export const create = async ({ name }: Create.Args) => {
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