import { QueryResolvers } from "@/api/graphql";

const queries: QueryResolvers = {
  getAllWallets: async(_, { ownerId }, {dataSources: { prisma }}) => {
    return await prisma.walletDS.readMany({ ownerId })
  },
}


export default queries;
