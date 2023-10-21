import { schema, types } from "papr";
import { schemaOptions } from "../config";
import { mongodb } from "@/server/db/mongodb/client";
import { balanceObjectType } from "@/server/model";

export const TagSchema = schema({
  /**
   * Name of the tag
   */
  name: types.string({ required: true }),
  /**
   * Balance of the tag
   */
  balance: types.array(types.object({
    /**
     * Object ID of the account of the balance of the tag
     */
    accountID: types.objectId({ required: true }),
    /**
     * Balance of the account balance of the tag
     */
    balance: types.array(balanceObjectType, { required: true })
  }), { required: true })
}, schemaOptions)

export type TagDocument = typeof TagSchema[0]

export const Tag = () => mongodb.papr.model('tags', TagSchema)