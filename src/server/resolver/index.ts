import * as Mutation from './mutation'
import * as Query from './query'

import type { Resolvers } from '@/api/graphql'

export const resolvers: Resolvers = { Query, Mutation }
