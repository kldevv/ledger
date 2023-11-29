const resolvers = {
  Query: {
    users: () => {
      return [{
        id: '123',
        firstName: '123',
        lastName: '123',
        email: '123',
        username: '123',
        image: '123'
      }]
    },
    searchUser: async (_, { __ }) => {
      return {
        id: '123',
        firstName: '123',
        lastName: '123',
        email: '123',
        username: '123',
        image: '123'
      }
    }
  }
}

export default resolvers