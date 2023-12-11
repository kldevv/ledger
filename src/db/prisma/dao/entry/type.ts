import { Entry } from "@prisma/client"
import { AccountDetail } from "../account"

export type EntryDetail = Entry & {
  account: AccountDetail
}