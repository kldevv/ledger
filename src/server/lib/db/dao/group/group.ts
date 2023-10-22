import { Group } from "@prisma/client";
import prisma from "../../client";

/**
 * Query a list of groups with their IDs and names.
 *
 * @returns A promise that resolves to an array of objects, each containing the `id` and `name` of a group.
 * @throws If an error occurs during the database query, it is thrown.
 */
const getAllGroupsIdAndName = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const groups = await prisma.group.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return groups;
  } catch (error) {
    console.error('Error in getAllGroupsIdAndName');
    throw error;
  }
};

/**
 * Create or update a group in the database.
 *
 * @param id - The ID of the group to update, or `undefined` to create a new group.
 * @param name - The name of the group to create or update.
 * @param categoryId - The ID of the category to associate with the group.
 * @returns The created or updated group object.
 * @throws If an error occurs during the database operation, it is thrown.
 */
const upsertGroup = async ({ id, name, categoryId }: {
  id?: number,
  name: string,
  categoryId: number
}): Promise<Group> => {
  try {
    const group = await prisma.group.upsert({
      where: { id },
      create: {
        name,
        categoryId,
      },
      update: {
        name,
        categoryId,
      },
    });

    return group;
  } catch (error) {
    console.error('Error in upsertGroup');
    throw error;
  }
};

export { getAllGroupsIdAndName, upsertGroup }