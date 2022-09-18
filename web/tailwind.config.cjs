/** @type {import('tailwindcss').Config} */
module.exports = {
  // incluir todas as pastas que terãoa rquivos tailwind
  content: [
    './src/**/*.tsx',
    './index.html' //incluir arquivos que o tailwind precisa importar no design
  ],
  theme: {
    // extender o background
    extend: {
      backgroundImage: {
        galaxy: "url('./public/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 23.08%, #47E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient':'linear-gradient(180deg, rgba(0, 0, 0 ,0) 0%, rgba(0 ,0 ,0 ,0.9) 67.08%)'
      }
    },
  },
  plugins: [],
}
