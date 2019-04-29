/*!
 * see https://cli.vuejs.org/guide/
   https://github.com/vuejs/vue-cli/blob/dev/docs/zh/config/README.md
 */

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8082,
    https: false,
    open: true,
    proxy: {
      '/': {
        target: 'http://shixiang.ngrok.xiaomiqiu.cn',
        ws: false,
        changeOrigin: true
      }
    }
  }
}