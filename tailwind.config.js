/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // ✅ THIS IS CRUCIAL
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [import('tailwind-scrollbar')],
  }
  