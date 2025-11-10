/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
        'primary': '#0F172A', 
        'secondary': '#1E293B',
        'success': '#16A34A',
        'danger': '#EF4444',
        'bond': '#C084FC',
      },
      fontFamily:{
        audiowide: ['Audiowide', 'sans-serif'],
        exo2: ['"Exo 2"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}