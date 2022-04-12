const { defineConfig } = require('@vue/cli-service')
// const { resolve } = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    sourceMap: false,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            // 导入自定义变量
            // hack: `true; @import "${resolve('src/assets/style/variables.less')}"`
            /* less 变量覆盖，用于自定义 ant design 主题 */
            // 'primary-color': '#F00',
            // 'link-color': '#F5222D',
            // 'border-radius-base': '4px',
            // }
          }
        }
      }
    }
  },
})
