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
        galaxy: "url('./public/background-galaxy.png')"
      }
    },
  },
  plugins: [],
}
