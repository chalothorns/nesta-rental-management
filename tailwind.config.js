
import forms from '@tailwindcss/forms'; 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#53b8e0"


    },
  },
},
  plugins: [
    forms,
  ],
}
