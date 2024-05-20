import { useState } from 'react'

import { CurrentBranchContext } from '@/components/core/hooks/useCurrentBranch/context'

import { BranchMock } from '../mocks'

import type { Branch } from '@/api/graphql'
import type { Decorator } from '@storybook/react'

export const CurrentBranchDecorator: Decorator = (Story) => {
  const [currentBranch, setCurrentBranch] = useState<undefined | Branch>(
    BranchMock.USD,
  )

  return (
    <CurrentBranchContext.Provider value={[currentBranch, setCurrentBranch]}>
      <Story />
    </CurrentBranchContext.Provider>
  )
}
