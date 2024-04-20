import type { Account, User } from '@prisma/client'
import type { DefaultSession } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id?: string | null
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/adapters' {
  interface PrismaAdapter extends Adapter {
    createUser: (user: Omit<AdapterUser, 'id'>) => Awaitable<User>
    getUser: (id: string) => Awaitable<User | null>
    getUserByEmail: (email: string) => Awaitable<User | null>
    getUserByAccount: (
      providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ) => Awaitable<User | null>
    updateUser: (
      user: Partial<AdapterUser> & Pick<AdapterUser, 'id'>,
    ) => Awaitable<User>
    linkAccount: (
      account: AdapterAccount,
    ) => Awaitable<Account | null | undefined>
    getSessionAndUser?: (
      sessionToken: string,
    ) => Awaitable<{ session: AdapterSession; user: User } | null>
  }
}
