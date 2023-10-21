import { schema, types } from "papr";
import { schemaOptions } from "../config";
import { mongodb } from "@/server/db/mongodb/client";
import { balanceObjectType } from "@/server/model";

export const StakeholderSchema = schema({
  /**
   * Name of the stakeholder
   */
  name: types.string({ required: true }),
  /**
   * Balance of the stakeholder
   */
  balance: types.array(balanceObjectType, { required: true })
}, schemaOptions)

export type StakeholderDocument = typeof StakeholderSchema[0]

export const Stakeholder = () => mongodb.papr.model('stakeholders', StakeholderSchema)