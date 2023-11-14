import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "foreground": "var(--foreground)",
        "background": "var(--background)",
        "top-background": "var(---background)",
        "primary": "var(--primary)",
        "top-primary": "var(---primary)",
        "danger": "var(--danger)",
        "top-danger": "var(---danger)",
        "alert": "var(--alert)",
        "top-alert": "var(---alert)",
        "success": "var(--success)",
        "top-success": "var(---success)",
      },
    },
  },
  plugins: [],
}
export default config
