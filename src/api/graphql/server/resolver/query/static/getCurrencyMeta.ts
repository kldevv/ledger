import { QueryResolvers } from "@/api/graphql";

export const getCurrencyMeta: QueryResolvers['getCurrencyMeta'] = async (
  _, __, { dataSources }
) => {
  return dataSources.static.currency.readMany()
}
