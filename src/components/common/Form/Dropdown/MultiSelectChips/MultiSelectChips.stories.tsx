import { Currency } from '@/api/graphql'
import { CurrencyChip } from '@/components/common'

import { MultiSelectChips } from './MultiSelectChips'

import type { DropdownOption } from '..'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MultiSelectChips> = {
  component: MultiSelectChips,
}

export default meta
type Story = StoryObj<typeof MultiSelectChips>

const options: Array<DropdownOption> = [
  { value: '1', label: 'First' },
  { value: '2', label: 'Second' },
  { value: '3', label: 'Third' },
  { value: '4', label: 'Fourth' },
  { value: '5', label: <CurrencyChip currency={Currency.NTD} /> },
]

export const OneItem: Story = {
  args: { values: ['1'], options },
}

export const TwoItems: Story = {
  args: { values: ['1', '2'], options },
}

export const ThreeItems: Story = {
  args: { values: ['1', '2', '3'], options },
}

export const More: Story = {
  args: { values: ['1', '2', '3', '4', '5'], options },
}

export const Chip: Story = {
  args: { values: ['5'], options },
}
