import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { paper: '#f3f1e9', ink: '#171712', acid: '#d8ff55' }, fontFamily: { sans: ['Arial', 'sans-serif'], mono: ['monospace'] } } },
  plugins: [],
}
export default config
