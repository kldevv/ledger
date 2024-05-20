import { BranchesDocument } from '@/api/graphql'

import { UserIdMock, BranchesMock } from '../mocks'

import type { BranchesQuery, BranchesQueryVariables } from '@/api/graphql'
import type { MockedResponse } from '@apollo/client/testing'

export const useBranchesQueryMock: MockedResponse<
  BranchesQuery,
  BranchesQueryVariables
> = {
  request: {
    query: BranchesDocument,
    variables: {
      input: {
        userId: UserIdMock,
      },
    },
  },
  result: {
    data: {
      branches: BranchesMock,
    },
  },
  maxUsageCount: 100,
}
