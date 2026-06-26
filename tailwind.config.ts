import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#08090b',
        foreground: '#f3f4f6',
        card: '#0f1115',
        'card-foreground': '#f3f4f6',
        primary: {
          DEFAULT: '#00f2fe',
          foreground: '#08090b',
        },
        secondary: {
          DEFAULT: '#4facfe',
          foreground: '#f3f4f6',
        },
        muted: '#171a21',
        'muted-foreground': '#9ca3af',
        accent: {
          DEFAULT: '#10b981',
          foreground: '#08090b',
        },
        border: '#1f2937',
      },
    },
  },
  plugins: [],
}
export default config