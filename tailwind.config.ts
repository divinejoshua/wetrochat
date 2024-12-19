import type { Config } from "tailwindcss";

export default {
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
        default : '#3B82F6',
        blacktext : '#333',
        faded : '#999',
        danger : '#FF3737',
        warning : '#EED202',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1200px',
        xl: '1440px',
      },
    },
    fontFamily: {
      'sans': ['DM Sans', 'DM Sans',],
      'serif': ['DM Sans', 'DM Sans',],
      'mono': ['DM Sans', 'DM Sans',],
      'display': ['DM Sans', ],
      'body': ['"DM Sans"',],
    }
  },
  plugins: [],
} satisfies Config;
