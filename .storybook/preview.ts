import '../styles/globals.css'

import type { Preview } from '@storybook/react'

import { CurrentBranchDecorator, SessionDecorator } from '../src/dev/decorators'
import i18n from './i18next'

const preview: Preview = {
  globals: {
    locale: 'en',
    locales: {
      en: { title: 'English', left: '🇺🇸' },
    },
  },
  parameters: {
    i18n,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [SessionDecorator, CurrentBranchDecorator],
}

export default preview
