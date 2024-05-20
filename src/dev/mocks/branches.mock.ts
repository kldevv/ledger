import { Currency, type Branch } from '@/api/graphql'

import { DateMock } from './date.mock'
import { UserIdMock } from './session.mock'

/**
 * Branch mock - Base
 */
const Base: Pick<
  Branch,
  '__typename' | 'userId' | 'updatedAt' | 'createdAt' | 'deletedAt'
> = {
  __typename: 'Branch',
  userId: UserIdMock,
  createdAt: DateMock.Jan1st,
  updatedAt: DateMock.Feb1st,
  deletedAt: DateMock.Mar1st,
}

/**
 * Branch mock - EUR
 */
const EUR: Branch = {
  ...Base,
  currency: Currency.EUR,
  id: 'clweerv5k0000lm59c3ht6ags',
  name: 'Mock EUR Branch',
}

/**
 * Branch mock - USD
 */
const USD: Branch = {
  ...Base,
  currency: Currency.USD,
  id: 'clwekjdfh0002lm599zj264d9',
  name: 'Mock USD Branch',
}

/**
 * Branch mock - USD
 */
const NTD: Branch = {
  ...Base,
  currency: Currency.NTD,
  id: 'clwekke7j0004lm599hoq376o',
  name: 'Mock NTD Branch',
}

/**
 * Branch mock - USD
 */
const RMB: Branch = {
  ...Base,
  currency: Currency.RMB,
  id: 'clwel7lkl0006lm59babjfkh1',
  name: 'Mock RMB Branch',
}

/**
 * Branch mock
 */
export const BranchMock = {
  EUR,
  USD,
  NTD,
  RMB,
} as const

/**
 * Branches mock
 */
export const BranchesMock = Object.values(BranchMock)
