import { Transaction } from "@prisma/client";
import prisma from "../../client";
import { SharedContextArgs } from "../types";
import { CreateTransactionArgs, DeleteTransactionArgs, GetTransactionsArgs, GetTransactionsReturns, UpdateTransactionArgs } from "./transaction.types";

export const createTransaction = async (ctx: SharedContextArgs, args: CreateTransactionArgs): Promise<Transaction> => {
  const { title, accruedDate, entries } = args

  try {
    const transaction = await prisma.transaction.create({
      data: {
        currency: ctx.currency,
        title,
        accruedDate,
        entries: {
          create: entries
        }
      },
      include: {
        entries: {
          select: {
            id: true,
            settledDate: true,
            debit: true,
            credit: true,
            accountId: true,
            status: true,
            memo: true,
            userId: true
          }
        }
      },
    });

    return transaction;
  } catch (error) {
    console.error('Error in createTransaction', ctx, args, error);
    throw error;
  }
};


export const getTransactions = async (ctx: SharedContextArgs, args?: GetTransactionsArgs): Promise<GetTransactionsReturns> => {
  const { id, title, accruedDate, entries } = args ?? {}

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        currency: ctx.currency,
        id,
        title,
        accruedDate,
        entries: {
          every: entries
        }
      },
      select: {
        id: true,
        title: true,
        accruedDate: true,
        entries: {
          select: {
            id: true,
            settledDate: true,
            debit: true,
            credit: true,
            accountId: true,
            status: true,
            memo: true,
            userId: true
          }
        }
      },
    });

    return transactions;
  } catch (error) {
    console.error('Error in getTransactions', ctx, args, error);
    throw error;
  }
};

export const updateTransaction = async (args: UpdateTransactionArgs): Promise<Transaction> => {
  const { id, title, accruedDate, entries } = args

  if (title == null && entries == null && accruedDate == null) {
    console.error('Error in updateTransaction: Invalid Update Args', args);
    throw new Error('Invalid Update Args');
  }

  try {
    const transaction = await prisma.transaction.update({
      where: {
        id
      },
      data: {
        title,
        accruedDate,
        entries: entries && {
          deleteMany: {},
          createMany: {
            data: entries
          }
        }
      }
    });

    return transaction;
  } catch (error) {
    console.error('Error in updateTransaction', args, error);
    throw error;
  }
};

export const deleteTransaction = async (args: DeleteTransactionArgs): Promise<Transaction> => {
  const { id } = args

  try {
    const entries = prisma.entry.deleteMany({
      where: {
        transactionId: id
      }
    })
    const transaction = prisma.transaction.delete({
      where: {
        id,
      },
    });

    const result = await prisma.$transaction([entries, transaction])

    return result[1];
  } catch (error) {
    console.error('Error in deleteTransaction', args, error);
    throw error;
  }
}