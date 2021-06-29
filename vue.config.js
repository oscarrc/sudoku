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
    short_name: '数独 Sudoku',
    description: 'Procedurally generated and relaxing Sudoku game',
    categories: ["Games", "Puzzle", "Sudoku"],
    screenshots: [],
    icons: [],
    dir: "ltr",
    lang: "en",
    scope: "/",
    start_url: ".",
    display: "standalone",
    theme_color: "#d11920",
    background_color: "#ffffff",
    orientation: "portrait",
    related_applications: [
      {
        "platform": "web",
        "url": "https://sudoku.oscarrc.me"
      }
    ]
  }
}
