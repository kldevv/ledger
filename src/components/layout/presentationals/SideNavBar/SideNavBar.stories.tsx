import { SideNavBar } from './SideNavBar'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SideNavBar> = {
  component: SideNavBar,
}

export default meta
type Story = StoryObj<typeof SideNavBar>

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
