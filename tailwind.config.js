/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,js,svelte}"],
  theme: {
    extend: {},
    // DaisyUI themes can be specified here
    daisyui: {
      themes: [
        'dark',
        'light',
          'cyberpunk'
        // other themes...
      ],
    },
  },
  plugins: [require("daisyui")],
}