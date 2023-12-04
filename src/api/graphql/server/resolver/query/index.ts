import { Currency, QueryResolvers } from "@/api/graphql";

const queries: QueryResolvers = {
  getAllWallets: async() => {
    return [{
      id: '123',
      name: '123',
      currency: Currency.USD,
      ownerId: '123'
    }]
  },
}


export default queries;
