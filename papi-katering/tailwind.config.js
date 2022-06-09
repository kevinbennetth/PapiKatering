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
      },
      animation: {
        "alert-move-down": "move-down 150ms ease-out both"
      },
      keyframes: {
        "move-down": {
          '0%': {transform: 'translateY(-50%)'},
          '100%': {transform: 'translateY(100%)'}
        },
      }
    },
  },
  plugins: [],
}