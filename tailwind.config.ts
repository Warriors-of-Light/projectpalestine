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
        "t-background": "var(--t-background)",
        "primary": "var(--primary)",
        "t-primary": "var(--t-primary)",
        "danger": "var(--danger)",
        "t-danger": "var(--t-danger)",
        "alert": "var(--alert)",
        "t-alert": "var(--t-alert)",
        "success": "var(--success)",
        "t-success": "var(--t-success)",
      },
    },
  },
  plugins: [],
}
export default config
