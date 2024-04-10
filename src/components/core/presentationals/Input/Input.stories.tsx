import { useCallback, useState } from 'react'

import { Input } from './Input'

import type { InputProps } from './Input'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Input> = {
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

/**
 * Date input template
 */
const DateTemplate = (args: InputProps) => {
  const [value, setValue] = useState('')
  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    },
    [],
  )

  return (
    <Input {...args}>
      <Input.Date value={value} onChange={handleOnChange} />
    </Input>
  )
}

export const Date: Story = {
  render: (args) => <DateTemplate {...args} />,
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

export const WithPlaceholder: Story = {
  render: (args) => (
    <Input {...args}>
      <Input.Text placeholder="This is a placeholder..." />
    </Input>
  ),
}

export const WithAll: Story = {
  render: (args) => (
    <Input {...args} label="Input label" error="This is an error.">
      <Input.Text placeholder="This is a placeholder..." />
    </Input>
  ),
}

export const Static: Story = {
  render: (args) => (
    <Input {...args} label="Input label" error="This is an error.">
      <Input.Static>Static information</Input.Static>
    </Input>
  ),
}
