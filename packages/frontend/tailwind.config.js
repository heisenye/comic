/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,jsx}', '../common/utils/*.jsx', '../ui/src/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Noto: ['Noto Sans SC', 'sans-serif'],
        cn_2: ['tsangeryuyangtw02-subset', 'sans-serif'],
        cn_3: ['tsangeryuyangtw03-subset', 'sans-serif']
      },
      screens: {
        xs: '300px',
        sm: '360px',
        md: '475px',
        lg: '600px',
        xl: '768px',
        '2xl': '900px',
        '3xl': '1024px',
        '4xl': '1280px',
        '5xl': '1536px',
        '6xl': '1920px'
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

          accent: 'rgb(100 116 139)',

          info: 'rgb(96 165 250)',

          success: 'rgb(52 211 153)',

          warning: 'rgb(217 119 6)',

          error: 'rgb(248 113 113)'
        }
      }
    ]
  }
}
