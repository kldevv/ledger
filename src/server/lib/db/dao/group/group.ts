import { Group } from "@prisma/client";
import prisma from "../../client";
import { SharedContextArgs } from "../types";
import { CreateGroupArgs, DeleteGroupArgs, GetGroupsArgs, GetGroupsReturns, UpdateGroupArgs } from "./group.types"

export const createGroup = async (ctx: SharedContextArgs, args: CreateGroupArgs): Promise<Group> => {
  const { name, categoryId } = args

  try {
    const group = await prisma.group.create({
      data: {
        currency: ctx.currency,
        name,
        categoryId
      },
    });

    return group;
  } catch (error) {
    console.error('Error in createGroup', ctx, args, error);
    throw error;
  }
};


export const getGroups = async (ctx: SharedContextArgs, args: GetGroupsArgs): Promise<GetGroupsReturns> => {
  const { id, name, categoryId } = args

  try {
    const groups = await prisma.group.findMany({
      where: {
        currency: ctx.currency,
        id,
        name,
        categoryId
      },
      select: {
        id: true,
        name: true,
        category: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      },
    });

    return groups;
  } catch (error) {
    console.error('Error in getGroups', ctx, args, error);
    throw error;
  }
};

export const updateGroup = async (ctx: SharedContextArgs, args: UpdateGroupArgs): Promise<Group> => {
  const { id, name, categoryId } = args

  if (name == null && categoryId == null) {
    console.error('Error in updateGroup: Invalid Update Args', ctx, args);
    throw new Error('Invalid Update Args');
  }

  try {
    const group = await prisma.group.update({
      where: {
        id
      },
      data: {
        name,
        categoryId
      }
    });

    return group;
  } catch (error) {
    console.error('Error in updateGroup', ctx, args, error);
    throw error;
  }
};

export const deleteGroup = async (ctx: SharedContextArgs, args: DeleteGroupArgs): Promise<Group> => {
  const { id } = args

  try {
    const group = await prisma.group.delete({
      where: {
        id,
      },
    });

    return group;
  } catch (error) {
    console.error('Error in deleteGroup', ctx, args, error);
    throw error;
  }
}