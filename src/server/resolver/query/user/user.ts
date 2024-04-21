import { GraphQLError } from 'graphql'

import { findUser } from '@/server/db/prisma/dao/user'

import { transformUser } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const user: QueryResolvers['user'] = async (_, __, { session }) => {
  if (session?.user.id == null) {
    throw new GraphQLError('Missing user id')
  }

  const user = await findUser({ id: session?.user.id })

  return transformUser(user)
}
