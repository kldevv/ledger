import { Input } from './Input'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Input> = {
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Text: Story = {
  render: (args) => (
    <Input {...args}>
      <Input.Text />
    </Input>
  ),
}

export const WithError: Story = {
  render: (args) => (
    <Input {...args} error="This is an error.">
      <Input.Text />
    </Input>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <Input {...args} label="Input label">
      <Input.Text />
    </Input>
  ),
}

export const WithLabelAndError: Story = {
  render: (args) => (
    <Input {...args} label="Input label" error="This is an error.">
      <Input.Text />
    </Input>
  ),
}

export const Placeholder: Story = {
  render: (args) => (
    <Input {...args}>
      <Input.Text placeholder="This is a placeholder..." />
    </Input>
  ),
}
