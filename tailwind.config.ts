import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-green": "#327163",
        "secondary-green": "#3F907D",
        "primary-red": "#D32F2F",
      },
      backgroundColor: {
        "light-green": "#EEF7F5",
        "light-red": "#FFE0E0",
        "light-green-1": "#CDFFCD",
        "light-green-2": "#7FC7B6",
      },
    },
  },
  plugins: [],
};
export default config;
