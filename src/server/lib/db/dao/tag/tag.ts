import prisma from "../../client"

/**
 * Retrieves the names of all tags from the database.
 *
 * @returns A promise that resolves to an array of tag names.
 * @throws If an error occurs during the database query, it is logged and rethrown.
 */
const getAllTagNames = async (): Promise<string[]> => {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        name: true,
      },
    })

    return tags.map((tag) => tag.name)
  } catch (error) {
    console.log('Error in getAllTagNames')
    throw error
  }
}

/**
 * Create or update a tag in the database.
 *
 * @param name - The name of the tag to create or update.
 * @returns The created or updated tag object.
 * @throws If an error occurs during the database operation, it is thrown.
 */
const upsertTag = async (name: string): Promise<void> => {
  try {
    // Attempt to create the tag, or update it if it already exists based on the unique "name" constraint.
    await prisma.tag.upsert({
      where: { name },
      create: { name },
      update: { name },
    })
  } catch (error) {
    console.log('Error in upsertTag')
    throw error
  }
}


export { getAllTagNames, upsertTag }