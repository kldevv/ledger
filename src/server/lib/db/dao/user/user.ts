import { User } from "@prisma/client";
import prisma from "../../client";

/**
 * Query all user names from the database.
 *
 * @returns A promise that resolves to an array of user names.
 * @throws If an error occurs during the database query, it is thrown.
 */
const getAllUsersIdAndName = async (): Promise<{ id: number, name: string }[]> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true
      }
    });

    return users
  } catch (error) {
    console.error('Error in getAllUserNames');

    throw error;
  }
};

/**
 * Create or update a user in the database.
 *
 * @param id - The ID of the tag to update, or `undefined` to create a new tag.
 * @param name - The name of the user to create or update.
 * @returns The created or updated user object.
 * @throws If an error occurs during the database operation, it is thrown.
 */
const upsertUser = async ({ id, name }: { id?: number, name: string }): Promise<User> => {
  try {
    const user = await prisma.user.upsert({
      where: { id },
      create: { name },
      update: { name },
    });

    return user;
  } catch (error) {
    console.error('Error in upsertUser');

    throw error;
  }
};

export { getAllUsersIdAndName, upsertUser };