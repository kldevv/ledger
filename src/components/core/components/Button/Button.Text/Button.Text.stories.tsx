import { ButtonText } from './Button.Text'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ButtonText> = {
  component: ButtonText,
  args: {
    label: 'Button.Link',
  },
}

export default meta

type Story = StoryObj<typeof ButtonText>

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
