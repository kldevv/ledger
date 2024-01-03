import prisma from "@/db/prisma/client"
import { Entry } from "@prisma/client"

export namespace CreateOne {
  export type Args = Omit<Entry, 'createdDate' | 'updatedDate' | 'id'>
}

export const createOne = async (args: CreateOne.Args) => {
  try {
    await prisma.entry.create({
      data: args
    })
  } catch (e) {
    throw e
  }
}