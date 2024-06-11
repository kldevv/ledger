import { Link } from './Link'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Link> = {
  component: Link,
  args: {
    variant: 'primary',
    className: 'text-sm',
    href: '',
    children: 'Hello',
  },
  render: (args) => (
    <div className="h-8 w-16">
      <Link {...args} />
    </div>
  ),
}

export default meta

type Story = StoryObj<typeof Link>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
