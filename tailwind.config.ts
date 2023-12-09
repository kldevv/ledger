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
      
      // base color palette
      white: '#FFFFFF',
      lightGray: '#f9fafb',
      midGray: '#e5e7eb',
      darkMidGray: '#9ca3af',

      // main color palette
      main: '#AC5850',
      lightAccent: '#E27E61',
      lightShades: '#FAF9F8',
      darkAccent: '#B0879E',
      darkShades: '#333047',
      
      // rainbow color palette
      'red': 'rgb(255, 96, 92)',  //#FF605C
      'yellow': 'rgb(255, 189, 68)', //#FFBD44
      'green': 'rgb(0, 202, 78)', //#FFBD44

      // rainbow halo color palette 
      'red-halo': 'rgb(255, 96, 92, 0.1)',  //#FF605C
      'yellow-halo': 'rgb(255, 189, 68, 0.1)', //#FFBD44
      'green-halo': 'rgb(0, 202, 78, 0.1)', //#FFBD44
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
