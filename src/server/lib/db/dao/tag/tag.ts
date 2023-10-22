import { Tag } from "@prisma/client"
import prisma from "../../client"

/**
 * Query the names of all tags from the database.
 *
 * @returns A promise that resolves to an array of tag objects.
 * @throws If an error occurs during the database query, it is thrown.
 */
const getAllTags = async (): Promise<{id: number, name: string}[]> => {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true
      }
    })

    return tags
  } catch (error) {
    console.log('Error in getAllTagNames')

    throw error
  }
}

/**
 * Create or update a tag in the database.
 * @param id - The ID of the tag to update, or `undefined` to create a new tag.
 * @param name - The name of the tag to create or update.
 * @returns The created or updated tag object.
 * @throws If an error occurs during the database operation, it is thrown.
 */
const upsertTag = async ({id, name}: {id?: number, name: string}): Promise<Tag> => {
  try {
    const tag = await prisma.tag.upsert({
      where: { id },
      create: { name },
      update: { name },
    })

    return tag
  } catch (error) {
    console.log('Error in upsertTag')
    
    throw error
  }
}


export { getAllTags, upsertTag }