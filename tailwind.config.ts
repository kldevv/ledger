import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{tsx,mdx}',
    './src/components/**/*.{tsx,mdx}',
    './src/packages/**/*.{tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // base color palette
      white: 'rgb(255, 255, 255)', // #FFFFFF
      'loading-gray': 'rgb(241, 240, 245)',
      'mid-gray': 'rgb(229, 231, 235)', // #E5E7EB
      gray: 'rgb(156, 163, 175)', // #9CA3AF

      // main color palette
      main: 'rgb(172, 88, 80)', // #AC5850
      'light-accent': 'rgb(226, 126, 97)', // #E27E61
      'light-shades': 'rgb(250, 249, 248)', // #FAF9F8
      'dark-accent': 'rgb(176, 135, 158)', // #B0879E
      'dark-shades': 'rgb(51, 48, 71)', // #333047

      // main halo color palette
      'light-accent-halo': 'rgba(226, 126, 97, 0.1)', // #E27E61

      // rainbow color palette
      red: 'rgb(255, 96, 92)', // #FF605C
      'dark-red': 'rgb(139, 0, 0)', // #8B0000
      yellow: 'rgb(255, 189, 68)', // #FFBD44
      green: 'rgb(0, 202, 78)', // #FFBD44

      // rainbow halo color palette
      'red-halo': 'rgb(255, 96, 92, 0.1)', //#FF605C
      'yellow-halo': 'rgb(255, 189, 68, 0.1)', //#FFBD44
      'green-halo': 'rgb(0, 202, 78, 0.1)', //#FFBD44
    },
  },
  plugins: [],
}
export default config
