import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: "var(--primaryColor)" ,
        primaryColor_2: "var(--primaryColor_2)" ,
        secondaryColor: "var(--secondaryColor) ",
        drakColor: "var(--darkColor)" 
      },
      fontFamily: {
        Tajawal: ['Tajawal']
      }
    },
  },
  plugins: [],
};
export default config;
