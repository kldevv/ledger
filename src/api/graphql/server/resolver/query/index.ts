import { Currency, QueryResolvers } from "@/api/graphql/_codegen/schema";

const queries: QueryResolvers = {
  getAllWallets: async(_, { input }, { }) => {
    return [{
      id: '123',
      name: '123',
      currency: Currency.Usd,
      ownerId: '123'
    }]
  },
}


export default queries;
