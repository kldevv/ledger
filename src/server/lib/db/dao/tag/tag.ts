import { Tag } from "@prisma/client";
import prisma from "../../client";
import { SharedContextArgs } from "../types";
import { CreateTagArgs, DeleteTagArgs, GetTagsArgs, GetTagsReturns, UpdateTagArgs } from "./tag.types";

export const createTag = async (ctx: SharedContextArgs, args: CreateTagArgs): Promise<Tag> => {
  const { name } = args

  try {
    const tag = await prisma.tag.create({
      data: {
        currency: ctx.currency,
        name,
      },
    });

    return tag;
  } catch (error) {
    console.error('Error in createTag', ctx, args, error);
    throw error;
  }
};


export const getTags = async (ctx: SharedContextArgs, args: GetTagsArgs): Promise<GetTagsReturns> => {
  const { id, name } = args

  try {
    const tags = await prisma.tag.findMany({
      where: {
        currency: ctx.currency,
        id,
        name,
      },
      select: {
        id: true,
        name: true
      },
    });

    return tags;
  } catch (error) {
    console.error('Error in getTags', ctx, args, error);
    throw error;
  }
};

export const updateTag = async (ctx: SharedContextArgs, args: UpdateTagArgs): Promise<Tag> => {
  const { id, name } = args

  try {
    const tag = await prisma.tag.update({
      where: {
        id
      },
      data: {
        name,
      }
    });

    return tag;
  } catch (error) {
    console.error('Error in updateTag', ctx, args, error);
    throw error;
  }
};

export const deleteTag = async (ctx: SharedContextArgs, args: DeleteTagArgs): Promise<Tag> => {
  const { id } = args

  try {
    const tag = await prisma.tag.delete({
      where: {
        id,
      },
    });

    return tag;
  } catch (error) {
    console.error('Error in deleteTag', ctx, args, error);
    throw error;
  }
}