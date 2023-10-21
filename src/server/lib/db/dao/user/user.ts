import { User } from "@prisma/client";
import prisma from "../../client";

/**
 * Query all users from the database.
 *
 * @returns A promise that resolves to an array of user objects.
 * @throws If an error occurs during the database query, it is thrown.
 */
const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany();

    return users
  } catch (error) {
    console.error('Error in getAllUsers');
    
    throw error;
  }
};

/**
 * Create or update a user in the database.
 *
 * @param name - The name of the user to create or update.
 * @returns The created or updated user object.
 * @throws If an error occurs during the database operation, it is thrown.
 */
const upsertUser = async (name: string): Promise<User> => {
  try {
    // Attempt to create the user, or update it if it already exists based on the unique "name" constraint.
    const user = await prisma.user.upsert({
      where: { name },
      create: { name },
      update: { name },
    });

    return user;
  } catch (error) {
    console.error('Error in upsertUser');
    throw error;
  }
};

export { getAllUsers, upsertUser };