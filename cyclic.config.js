module.exports = {
  // Define as entradas do seu projeto
  inputs: {
    main: 'src/main.js',
  },
  // Define as saídas do seu projeto
  outputs: {
    web: {
      dir: 'dist',
      publicUrl: '/',
      target: 'browser',
    },
  },
  // Define as opções de compilação
  buildOptions: {
    // Defina aqui as opções do seu compilador (por exemplo, minificação, etc.)
  },
  // Define as opções de desenvolvimento
  devOptions: {
    // Defina aqui as opções do seu servidor de desenvolvimento (por exemplo, porta, etc.)
  },
  // Define os plugins a serem usados
  plugins: [
    // Lista de plugins que você deseja usar
  ],
}
