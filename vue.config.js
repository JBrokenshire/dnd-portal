const path = require('path')

module.exports = {
  publicPath: "/",
  configureWebpack: {
    resolve: {
      alias: {
        '@core': path.resolve(__dirname, 'src/@core'),
        '@axios': path.resolve(__dirname, 'src/libs/axios'),
      },
    },
  },
  transpileDependencies: true,
}
