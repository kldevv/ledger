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
      
      white: '#FFFFFF',
      lightGray: '#f9fafb',
      midGray: '#e5e7eb',
      darkMidGray: '#9ca3af',

      main: '#AC5850',
      lightAccent: '#E27E61',
      lightShades: '#FAF9F8',
      darkAccent: '#B0879E',
      darkShades: '#333047',

      greenlight: 'rgb(74,222,128,0.1)'
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
