import { Link } from './Link'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Link> = {
  component: Link,
}

export default meta
type Story = StoryObj<typeof Link>

export const Primary: Story = {
  args: {
    href: '/',
    label: 'Link',
  },
}
