import { LinkText } from './Link.Text'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LinkText> = {
  component: LinkText,
  args: {
    href: '/',
    children: 'Text.Link',
  },
}

export default meta

type Story = StoryObj<typeof LinkText>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}
