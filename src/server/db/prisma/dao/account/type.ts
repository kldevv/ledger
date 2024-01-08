import { Account, Category } from "@prisma/client";

export type AccountDetail = Account & {
  category: Category
}