import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/server components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/client components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        main: '#0b0b0b',
        secondary: '#121212',
        tertiary: '#181818',
        accent: '#00ff99',
      },
    },
  },
  plugins: [],
};
export default config;
