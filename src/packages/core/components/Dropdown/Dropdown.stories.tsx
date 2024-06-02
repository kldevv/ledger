import { useState } from 'react'

import { Dropdown } from './Dropdown'

import type { DropdownItem } from './Dropdown.Item/Dropdown.Item'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
}

export default meta

type Story = StoryObj<typeof Dropdown>

const mockItems: DropdownItem[] = [
  {
    label: 'Moby Dick',
    value: 'Moby Dick',
    icon: 'Home',
  },
  {
    label: 'Snow White and the Seven Dwarfs',
    value: 'Snow White and the Seven Dwarfs',
    icon: 'ExclamationCircle',
  },
  {
    label: 'The Lord of the Rings',
    value: 'The Lord of the Rings',
    desc: 'The Lord of the Rings is a trilogy of epic fantasy adventure films directed by Peter Jackson',
    icon: 'US',
  },
  {
    label: 'Alice in Wonderland',
    value: 'Alice in Wonderland',
  },
]

const Template = ({ items, ...args }: Story['args'] = {}) => {
  const [value, setValue] = useState<DropdownItem | null>(mockItems[0])

  return (
    <Dropdown
      className="w-40"
      value={value}
      onChange={setValue}
      items={items ?? []}
      {...args}
    />
  )
}

export const Default: Story = {
  args: {
    label: 'Dropdown label',
    items: mockItems,
  },
  render: Template,
}

export const TriggerLoading: Story = {
  args: {
    label: 'Dropdown label',
    items: mockItems,
    triggerLoading: true,
  },
  render: Template,
}

export const MenuLoading: Story = {
  args: {
    label: 'Dropdown label',
    items: mockItems,
    menuLoading: true,
  },
  render: Template,
}

export const Empty: Story = {
  args: {
    placeholder: 'Placeholder',
    label: 'Dropdown label',
    items: [],
    value: null,
    onChange: () => null,
  },
  render: Template,
}

export const Error: Story = {
  args: {
    label: 'Dropdown label',
    items: mockItems,
    error: 'Template Error',
  },
  render: Template,
}
