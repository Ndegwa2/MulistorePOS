/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./Frontend/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB', // light gray background
        sidebar: '#1E293B',    // dark slate sidebar
        primary: '#2563EB',    // blue accent
        success: '#22C55E',    // green
        warning: '#FACC15',    // amber
        error: '#EF4444',      // red
        text: '#1E293B',       // dark readable text
      },
    },
  },
  plugins: [],
}