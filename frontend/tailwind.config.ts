import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf2f2',
          100: '#fde8e8',
          500: '#c53030',
          700: '#9b2c2c',
        },
      },
    },
  },
  plugins: [],
};

export default config;
