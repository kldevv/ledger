import { CategoryType } from "@prisma/client"

export type Category = {
  id: number,
  name: string
  type: CategoryType
}