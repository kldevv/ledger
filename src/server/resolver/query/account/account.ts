import { getServerSession } from 'next-auth'

import { authOptions } from '@/api/auth'
import { findAccount } from '@/server/db/prisma/dao/account'

import { transformAccount } from '../../transform'

import type { QueryResolvers } from '@/api/graphql'

export const account: QueryResolvers['account'] = async (
  _,
  { input: { id } },
  context,
) => {
  const a = await getServerSession(context.req, context.res, authOptions)

  console.log(a)

  const account = await findAccount({ id })

  return transformAccount(account)
}
