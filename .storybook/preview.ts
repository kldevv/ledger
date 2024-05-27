import '../styles/globals.css'

import type { Preview } from '@storybook/react'

import i18n from './i18next'

import { decorators } from '../src/packages/storybook/config'

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
  decorators,
}

export default preview
