import { schema, types } from "papr";
import { schemaOptions } from "../config";
import { mongodb } from "@/server/db/mongodb/client";
import { balanceObjectType } from "@/server/model";

export const AccountSchema = schema({
  /**
   * Name of the account
   */
  name: types.string({ required: true }),
  /**
   * Object ID of the category of the account
   */
  categoryID: types.objectId({ required: true }),
  /**
   * Is stakeholder involved in the account
   */
  isStakeholderInvolved: types.boolean({ required: true }),
  /**
   * Balance of the account
   */
  balance: types.array(balanceObjectType, { required: true })
}, schemaOptions)

export type AccountDocument = typeof AccountSchema[0]

export const Account = () => mongodb.papr.model('accounts', AccountSchema)