import { BranchesDocument } from '@/api/graphql'

import { UserIdMock, BranchesMock } from '../../mocks'

import type { BranchesQuery, BranchesQueryVariables } from '@/api/graphql'
import type { ApolloMock } from '@/dev/apollo/types'

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

declare module '@/dev/apollo/types' {
  interface ApolloMocks {
    useBranchesQueryMock: Partial<typeof useBranchesQueryMock>
  }
}
