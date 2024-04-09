import { useState } from 'react'

import { Dropdown } from './Dropdown'
import { DropdownOptions } from './Dropdown.Options/Dropdown.Options'

import type { DropdownItem, DropdownProps } from './Dropdown'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
}

export default meta
type Story = StoryObj<typeof Dropdown>

const items: DropdownItem<string>[] = [
  {
    title: 'Moby Dick',
    value: 'Moby Dick',
    outlineIcon: 'Home',
  },
  {
    title: 'Snow White and the Seven Dwarfs',
    value: 'Snow White and the Seven Dwarfs',
    solidIcon: 'ExclamationCircle',
  },
  {
    title: 'The Lord of the Rings',
    value: 'The Lord of the Rings',
    desc: 'The Lord of the Rings is a trilogy of epic fantasy adventure films directed by Peter Jackson',
    flagIcon: 'US',
  },
  {
    title: 'Alice in Wonderland',
    value: 'Alice in Wonderland',
  },
]

const MultiSelectTemplate = (args: DropdownProps) => {
  const [value, setValue] = useState<DropdownItem<string>[]>()

  return (
    <Dropdown {...args}>
      <Dropdown.MultiSelect
        items={items}
        value={value}
        placeholder="Select item"
        onChange={(change) => {
          setValue(change.selectedItems)
        }}
      >
        <DropdownOptions />
      </Dropdown.MultiSelect>
    </Dropdown>
  )
}

const SelectTemplate = (args: DropdownProps) => {
  const [value, setValue] = useState<DropdownItem<string>>()

  return (
    <Dropdown {...args}>
      <Dropdown.Select
        items={items}
        value={value}
        placeholder="Select item"
        onChange={(change) => setValue(change.selectedItem)}
      >
        <DropdownOptions />
      </Dropdown.Select>
    </Dropdown>
  )
}

export const Select: Story = {
  render: (args) => <SelectTemplate {...args} />,
}

export const MultiSelect: Story = {
  render: (args) => <MultiSelectTemplate {...args} />,
}

export const WithLabel: Story = {
  render: (args) => <SelectTemplate {...args} />,
  args: {
    label: 'Select Dropdown',
  },
}

export const WithError: Story = {
  render: (args) => <SelectTemplate {...args} />,
  args: {
    error: 'This is an error.',
  },
}
