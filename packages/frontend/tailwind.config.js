/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,jsx}', '../common/utils/*.jsx', '../ui/src/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Noto: ['Noto Sans SC', 'sans-serif'],
        base: ['tsangeryuyangtw-subset', 'sans-serif'],
      },
      fontSize: {

      },
      screens: {
        xs: '300px',
        sm: '360px',
        md: '450px',
        lg: '600px',
        xl: '760px',
        '2xl': '885px',
        '3xl': '1050px',
        '4xl': '1120x',
        '5xl': '1350px',
        '6xl': '1500px'
      },
      aspectRatio: {
        '3/4': '3 / 4'
      },
      container: {
        padding: '0.5rem',
        center: true
      },
      margin: {
        '1/2': '50%',
        '2/5': '40%',
        '1/3': '33.33%',
        '3/10': '30%'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        dark_: {
          'base-100': '#000000',

          primary: 'rgb(38 38 38)',

          secondary: 'rgb(82, 82, 82)',

          'secondary-content': 'rgb(228 228 231)',

          accent: 'rgb(165 180 252)',

          neutral: 'rgb(100 116 139)',

          info: 'rgb(96 165 250)',

          'info-content': 'rgb(224 242 254)',

          success: 'rgb(74 222 128)',

          'success-content': 'rgb(2 44 34)',

          warning: 'rgb(217 119 6)',

          'warning-content': 'rgb(255 237 213)',

          error: 'rgb(248 113 113)',

          'error-content': 'rgb(76 5 25)'
        }
      }
    ]
  }
}
