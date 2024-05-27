import { BranchesDocument } from '@/api/graphql'

import { UserIdMock, BranchesMock } from '../../../dev/mocks'

import type { BranchesQuery, BranchesQueryVariables } from '@/api/graphql'
import type { ApolloMock } from '@/packages/apollo.mock/types'

export const useBranchesQueryMock: ApolloMock<
  BranchesQuery,
  BranchesQueryVariables
> = {
  document: BranchesDocument,
  variables: {
    input: {
      userId: UserIdMock,
    },
  },
  data: {
    branches: BranchesMock,
  },
}

declare module '@/packages/apollo.mock/types' {
  interface ApolloMocks {
    useBranchesQueryMock: Partial<typeof useBranchesQueryMock>
  }
}
