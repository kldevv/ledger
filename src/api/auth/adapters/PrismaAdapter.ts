import prisma from '@/server/db/prisma/client'

import type { PrismaAdapter as Adapter } from 'next-auth/adapters'

export const PrismaAdapter: Adapter = {
  createUser: (data) => prisma.user.create({ data }),
  getUserByEmail: (email) =>
    prisma.user.findUnique({
      where: {
        email,
      },
    }),
  getUser: (id) => prisma.user.findUnique({ where: { id } }),
  getUserByAccount: async ({ provider, providerAccountId }) => {
    const userAccount = await prisma.userAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider,
          providerAccountId,
        },
      },
      select: {
        user: true,
      },
    })

    return userAccount?.user ?? null
  },
  linkAccount: (data) => prisma.userAccount.create({ data }),
  updateUser: ({ id, ...data }) =>
    prisma.user.update({
      where: { id },
      data,
    }),
  createSession: ({ sessionToken, userId, expires }) =>
    prisma.session.create({
      data: {
        sessionToken,
        userId,
        expires,
      },
    }),
  updateSession: (data) =>
    prisma.session.update({ where: { sessionToken: data.sessionToken }, data }),
  deleteSession: (sessionToken) =>
    prisma.session.delete({ where: { sessionToken } }),
  getSessionAndUser: async (sessionToken) => {
    const _session = await prisma.session.findUnique({
      where: {
        sessionToken,
      },
      include: {
        user: true,
      },
    })

    if (_session == null) return null

    const { user, ...session } = _session

    return { session, user }
  },
}
