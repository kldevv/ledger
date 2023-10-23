import { Account } from "@prisma/client";
import prisma from "../../client";
import { SharedContextArgs } from "../types";
import { CreateAccountArgs, DeleteAccountArgs, GetAccountArgs, GetAccountReturns, UpdateAccountArgs } from "./account.types";

export const createAccount = async (ctx: SharedContextArgs, args: CreateAccountArgs): Promise<Account> => {
  const { name, groupId } = args

  try {
    const account = await prisma.account.create({
      data: {
        currency: ctx.currency,
        name,
        groupId
      },
    });

    return account;
  } catch (error) {
    console.error('Error in createAccount', ctx, args, error);
    throw error;
  }
};


export const getAccounts = async (ctx: SharedContextArgs, args: GetAccountArgs): Promise<GetAccountReturns> => {
  const { id, name, groupId } = args

  try {
    const accounts = await prisma.account.findMany({
      where: {
        currency: ctx.currency,
        id,
        name,
        groupId
      },
      select: {
        id: true,
        name: true,
        group: {
          select: {
            id: true,
            name: true,
          }
        }
      },
    });

    return accounts;
  } catch (error) {
    console.error('Error in getAccounts', ctx, args, error);
    throw error;
  }
};

export const updateAccount = async (ctx: SharedContextArgs, args: UpdateAccountArgs): Promise<Account> => {
  const { id, name, groupId } = args

  if (name == null && groupId == null) {
    console.error('Error in updateAccount: Invalid Update Args', ctx, args);
    throw new Error('Invalid Update Args');
  }

  try {
    const account = await prisma.account.update({
      where: {
        id
      },
      data: {
        name,
        groupId
      }
    });

    return account;
  } catch (error) {
    console.error('Error in updateAccount', ctx, args, error);
    throw error;
  }
};

export const deleteAccount = async (ctx: SharedContextArgs, args: DeleteAccountArgs): Promise<Account> => {
  const { id } = args

  try {
    const account = await prisma.account.delete({
      where: {
        id,
      },
    });

    return account;
  } catch (error) {
    console.error('Error in deleteAccount', ctx, args, error);
    throw error;
  }
}