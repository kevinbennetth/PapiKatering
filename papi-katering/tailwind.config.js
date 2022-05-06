module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "src/index.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#28937F'
      }
    },
  },
  plugins: [],
}