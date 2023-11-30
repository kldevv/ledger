import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{tsx,mdx}',
    './src/components/**/*.{tsx,mdx}',
    './src/app/**/*.{tsx,mdx}',
  ],
  theme: {
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
