import { SideNav } from './SideNav'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SideNav> = {
  component: SideNav,
}

export default meta
type Story = StoryObj<typeof SideNav>

export const Primary: Story = {
  args: {
    className: 'w-48',
  },
}

export const HeightOverflow: Story = {
  args: {
    className: 'size-48',
  },
}
