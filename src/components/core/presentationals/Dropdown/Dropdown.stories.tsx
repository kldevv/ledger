import { Dropdown } from './Dropdown'
import { DropdownOptions } from './Dropdown.Options/Dropdown.Options'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
}

export default meta
type Story = StoryObj<typeof Dropdown>

const items = [
  {
    id: '744ff48c-43a8-4305-a068-9cc1bf9d6530',
    title: 'Moby Dick',
    value: 'moby-dick',
  },
  {
    id: '813df240-8790-4eb6-86ae-85bf41b1be6b',
    title: 'Snow White and the Seven Dwarfs',
    value: 'snow-white',
  },
  {
    id: '1607fc80-1c20-462e-8465-b11598055d14',
    title: 'The Lord of the Rings',
    value: 'rings',
    desc: 'The Lord of the Rings is a trilogy of epic fantasy adventure films directed by Peter Jackson',
  },
]

export const Select: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <Dropdown.Select items={items}>
        <DropdownOptions />
      </Dropdown.Select>
    </Dropdown>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <Dropdown {...args} label="Select Dropdown">
      <Dropdown.Select items={items}>
        <DropdownOptions />
      </Dropdown.Select>
    </Dropdown>
  ),
}

export const WithError: Story = {
  render: (args) => (
    <Dropdown {...args} error="This is an error.">
      <Dropdown.Select items={items}>
        <DropdownOptions />
      </Dropdown.Select>
    </Dropdown>
  ),
}

export const WithPlaceholder: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <Dropdown.Select items={items} placeholder="Select item">
        <DropdownOptions />
      </Dropdown.Select>
    </Dropdown>
  ),
}

export const WithAll: Story = {
  render: (args) => (
    <Dropdown {...args} error="This is an error." label="Select Dropdown">
      <Dropdown.Select items={items} placeholder="Select item">
        <DropdownOptions />
      </Dropdown.Select>
    </Dropdown>
  ),
}
