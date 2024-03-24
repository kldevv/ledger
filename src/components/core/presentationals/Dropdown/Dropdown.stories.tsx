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
    value: 'Moby Dick',
  },
  {
    id: '813df240-8790-4eb6-86ae-85bf41b1be6b',
    title: 'Snow White and the Seven Dwarfs',
    value: 'Snow White and the Seven Dwarfs',
  },
  {
    id: '1607fc80-1c20-462e-8465-b11598055d14',
    title: 'The Lord of the Rings',
    value: 'The Lord of the Rings',
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

export const WithIcon: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <Dropdown.Select
        items={[
          {
            id: '915db762-4476-409b-bc44-9808a07af085',
            title: 'Home',
            outlineIcon: 'Home',
            value: 'Home',
          },
          {
            id: '8a8681cc-ac25-4465-a194-d5d465a8988f',
            title: 'Bookmark',
            outlineIcon: 'Bookmark',
            value: 'Bookmark',
          },
          {
            id: '9850c17e-51db-4c55-a5f7-83816b435127',
            title: 'ExclamationCircle',
            solidIcon: 'ExclamationCircle',
            value: 'ExclamationCircle',
          },
        ]}
        placeholder="Select item"
      >
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
