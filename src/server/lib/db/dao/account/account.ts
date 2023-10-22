import { Account } from "@prisma/client";
import prisma from "../../client";

/**
 * Query a list of accounts with their IDs and names.
 *
 * @returns A promise that resolves to an array of objects, each containing the `id` and `name` of an account.
 * @throws If an error occurs during the database query, it is thrown.
 */
const getAllAccountsIdAndName = async (): Promise<{ id: number; name: string }[]> => {
  try {
    const accounts = await prisma.account.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return accounts;
  } catch (error) {
    console.error('Error in getAllAccountsIdAndName');
    throw error;
  }
};

/**
 * Create or update an account in the database.
 *
 * @param id - The ID of the account to update, or `undefined` to create a new account.
 * @param name - The name of the account to create or update.
 * @param groupId - The ID of the group to associate with the account.
 * @returns The created or updated account object.
 * @throws If an error occurs during the database operation, it is thrown.
 */
const upsertAccount = async ({id, name, groupId}: {
  id?: number,
  name: string,
  groupId: number
}): Promise<Account> => {
  try {
    const account = await prisma.account.upsert({
      where: { id },
      create: {
        name,
        groupId,
      },
      update: {
        name,
        groupId,
      },
    });

    return account;
  } catch (error) {
    console.error('Error in upsertAccount');

    throw error;
  }
};


export { getAllAccountsIdAndName, upsertAccount }