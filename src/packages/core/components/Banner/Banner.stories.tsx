import { Banner } from './Banner'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Banner> = {
  component: Banner,
  args: {
    title: 'Banner',
  },
}

export default meta
type Story = StoryObj<typeof Banner>

export const Default: Story = {}
