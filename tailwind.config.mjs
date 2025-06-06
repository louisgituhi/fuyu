/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'dm-mono': ['"DM Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}