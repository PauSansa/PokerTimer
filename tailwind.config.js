/** @type {import('tailwindcss').Config} */
module.exports = {
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
      fontFamily: {
        space: ["var(--font-space)", "monospace"],
      },
      colors: {
        'text': '#e5f2f2',
        'background': '#071818',
        'primary': '#94d9d9',
        'secondary': '#3e119c',
        'accent': '#f92944',
       },
       
             
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
