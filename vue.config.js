module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "数独 Sudoku";
          return args;
      })
  },
  assetsDir: 'assets',
  pwa: {
    name: '数独 Sudoku',    
    themeColor: '#ffffff',
    manifestOptions: {
      short_name: '数独 Sudoku',
      description: 'Dinamically generated and relaxing Sudoku game',
      categories: [
        'Games',
        'Puzzle',
        'Sudoku'
      ],
      screenshots: [
        {
          "src": "img/screenshot1.png",
          "type": "image/png",
          "sizes": "1600x761"
        },
        {
          "src": "img/screenshot2.png",
          "type": "image/png",
          "sizes": "1600x761"
        },
      ],
      dir: 'ltr',
      lang: 'en',
      scope: '/',
      start_url: '.',
      display: 'fullscreen',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      orientation: 'portrait',
      related_applications: [
        {
          platform: 'web',
          url: 'https://sudoku.oscarrc.me'
        }
      ]
    }  
  }
}
