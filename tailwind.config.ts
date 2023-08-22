/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'emerald': 'rgb(0, 245, 164)',
        'darkEmerald': 'rgb(0, 245, 164, 0.8)',
      },
      colors: {
        'emerald': 'rgb(0, 245, 164)',
        'darkEmerald': 'rgb(0, 245, 164, 0.8)',
        'customGrey': "#d3d3d3",
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif']
      },
      animation: {
        loader: 'loader 0.6s infinite alternate'
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: 'translate3d(0, -1rem, 0)'
          }
        }
      }
    },
  },
  plugins: [require("daisyui")],
}
