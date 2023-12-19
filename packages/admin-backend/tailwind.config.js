module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,jsx}', '../common/utils/*.jsx', '../ui/src/*.vue'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
        Noto: ['Noto Sans SC', 'sans-serif'],
      },
      screens: {
        xs: '300px',
        sm: '360px',
        md: '475px',
        lg: '600px',
        xl: '768px',
        '2xl': '900px',
        '3xl': '1024px'
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
    themes: ['winter']
  }
}
