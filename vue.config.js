const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index: {
      entry: './src/main.js',
      title: 'Color game',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        '@components': path.resolve(__dirname, './src/components/'),
        '@composables': path.resolve(__dirname, './src/composables/'),
        '@store': path.resolve(__dirname, './src/store/'),
      },
    },
  },
});
