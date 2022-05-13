const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '@components': path.resolve(__dirname, './src/components/'),
        '@store': path.resolve(__dirname, './src/store/'),
      }
    }
  }
})
