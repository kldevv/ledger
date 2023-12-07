import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{tsx,mdx}',
    './src/components/**/*.{tsx,mdx}',
    './src/app/**/*.{tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      lightgray: '#f9fafb',
      midgray: '#e5e7eb',
      darkmidgray: '#9ca3af'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
