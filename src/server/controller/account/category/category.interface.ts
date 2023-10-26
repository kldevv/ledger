import { CategoryType, Currency } from "@prisma/client";

export interface CreateCategoryArgs {
  currency: Currency,
  name: string,
  type: CategoryType
}

export interface UpdateCategoryNameArgs {
  id: number,
  name: string
}

export interface UpdateCategoryTypeArgs {
  id: number, 
  type: CategoryType
}


