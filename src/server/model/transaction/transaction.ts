import { schema, types } from "papr";
import { schemaOptions } from "../config";
import { mongodb } from "@/server/db/mongodb/client";
import { EntryStatus, EntryType } from "@/server/model";

const entryObjectType = types.object({
  /**
   * Settled date of the entry of the transaction
   */
  date: types.date({ required: true }),
  /**
   * Object ID of the account of the entry of the transaction
   */
  accountId: types.objectId({ required: true }),
  /**
   * Type of the entry of the transaction
   */
  type: types.enum(Object.values(EntryType), { required: true }),
  /**
   * Amount of the account of the transaction, corresponded to the type
   */
  amount: types.number({ required: true, minimum: 0}),
  /**
   * Memo of the entry of the transaction
   */
  memo: types.string(),
  /**
   * Status of the entry of the transaction
   */
  status: types.enum(Object.values(EntryStatus), { required: true }),
  /**
   * Object ID of the involved stakeholder of the entry of the transaction
   * , only required when the account is stakeholder involved
   */
  stakeholderId: types.objectId()
})

export const TransactionSchema = schema({
  /**
   * Occurring date of the transaction
   */
  date: types.date({ required: true }),
  /**
   * Title of the transaction
   */
  title: types.string({ required: true }),
  /**
   * Object ID of the tags of the transaction
   */
  tagsId: types.array(types.objectId, { required: true }),
  /**
   * Entries of the transaction
   */
  entries: types.array(entryObjectType, { required: true })
}, schemaOptions)

export type TransactionDocument = typeof TransactionSchema[0]

export const Transaction = mongodb.papr.model('transactions', TransactionSchema)