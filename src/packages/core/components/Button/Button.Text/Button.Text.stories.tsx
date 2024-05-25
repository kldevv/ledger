import { ButtonText } from './Button.Text'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ButtonText> = {
  component: ButtonText,
  args: {
    label: 'Button.Link',
    variant: 'primary',
  },
}

export default meta

type Story = StoryObj<typeof ButtonText>

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
  render: (args) => (
    <div className="h-5">
      <ButtonText {...args} />
    </div>
  ),
}
