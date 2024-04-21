import { AuthType, Provider } from '@/api/graphql'

import type { User } from '@/api/graphql'
import type { User as PrismaUser } from '@prisma/client'

export interface TransformUserArgs extends PrismaUser {
  /**
   * Relation field: accounts
   */
  accounts: {
    provider: string
    type: string
  }[]
}

export const transformUser = ({
  accounts,
  ...user
}: TransformUserArgs): User => {
  return {
    ...user,
    authType: mapAuthType(accounts.at(0)?.type),
    provider: mapProvider(accounts.at(0)?.provider),
  }
}

const mapProvider = (provider?: string) => {
  switch (provider) {
    case 'google':
      return Provider.GOOGLE
    default:
      return Provider.GITHUB
  }
}

const mapAuthType = (type?: string) => {
  switch (type) {
    default:
      return AuthType.OAUTH
  }
}
