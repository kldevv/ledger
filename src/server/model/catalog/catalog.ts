import { schema, types } from "papr";
import { schemaOptions } from "../config";
import { mongodb } from "@/server/db/mongodb/client";
import { CatalogType } from "@/server/model";

export const CatalogSchema = schema({
  /**
   * Name of the catalog
   */
  name: types.string({ required: true }),
  /**
   * Type of the catalog
   */
  type: types.enum(Object.values(CatalogType), { required: true }),
  /**
   * Categories of the catalog
   */
  categories: types.array({
    /**
     * Name of the category
     */
    name: types.string({ required: true }),
  }, { required: true })
}, schemaOptions)

export type CatalogDocument = typeof CatalogSchema[0]

export const Catalog = () => mongodb.papr.model('catalogues', CatalogSchema)