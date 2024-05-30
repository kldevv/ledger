import { setProjectAnnotations } from '@storybook/react'

import { decorators } from './config'
import { ApolloClientDecorator } from './decorators'

/**
 * Append decorators to composeStories in the jest tests
 */
setProjectAnnotations({
  decorators: [...decorators, ApolloClientDecorator],
})
