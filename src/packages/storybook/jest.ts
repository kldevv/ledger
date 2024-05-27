import { setProjectAnnotations } from '@storybook/react'

import { decorators } from './config'
import { ApolloClientDecorator } from './decorators'

setProjectAnnotations({
  decorators: [...decorators, ApolloClientDecorator],
})
