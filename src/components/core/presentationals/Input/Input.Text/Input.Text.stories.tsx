import { InputText } from './Input.Text'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof InputText> = {
  component: InputText,
}

export default meta
type Story = StoryObj<typeof InputText>

export const Primary: Story = {}
