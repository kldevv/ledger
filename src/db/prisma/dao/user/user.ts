import { User } from "@prisma/client";
import prisma from "../../client";
import { SharedContextArgs } from "../types";
import { CreateUserArgs, GetUsersReturns, GetUsersArgs, UpdateUserArgs, DeleteUserArgs } from "./user.types";

export const createUser = async (ctx: SharedContextArgs, args: CreateUserArgs): Promise<User> => {
  const { name } = args

  try {
    const user = await prisma.user.create({
      data: {
        name,
      },
    });

    return user;
  } catch (error) {
    console.error('Error in createUser', ctx, args, error);
    throw error;
  }
};


export const getUsers = async (ctx: SharedContextArgs, args?: GetUsersArgs): Promise<GetUsersReturns> => {
  const { id, name } = args ?? {}

  try {
    const users = await prisma.user.findMany({
      where: {
        id,
        name,
      },
      select: {
        id: true,
        name: true
      },
    });

    return users;
  } catch (error) {
    console.error('Error in getUsers', ctx, args, error);
    throw error;
  }
};

export const updateUser = async (args: UpdateUserArgs): Promise<User> => {
  const { id, name } = args

  try {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
      }
    });

    return user;
  } catch (error) {
    console.error('Error in updateUser', args, error);
    throw error;
  }
};

export const deleteUser = async (args: DeleteUserArgs): Promise<User> => {
  const { id } = args

  try {
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error('Error in deleteUser', args, error);
    throw error;
  }
}