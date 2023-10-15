/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-dark': 'theme(colors.slate.900)',
        'app-light': 'theme(colors.slate.50)',
        'app-primary': 'theme(colors.blue.400)',
        'app-secondary': 'theme(colors.blue.800)',
        'app-red': 'theme(colors.red.400)',
        'app-yellow': 'theme(colors.yellow.400)',
        'app-green': 'theme(colors.green.400)',
      }
    },
  },
  plugins: [],
}
