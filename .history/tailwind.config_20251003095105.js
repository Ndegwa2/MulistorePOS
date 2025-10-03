/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./Frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B',   // dark accent (slate-800)
        secondary: '#F8FAFC', // main background (slate-50)
        accent: '#0F172A',    // darker for buttons/sidebar
        text: '#1E293B',      // dark readable text
      },
    },
  },
  plugins: [],
}