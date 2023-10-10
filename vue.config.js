const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  devServer: {
    proxy: 'https://localhost:7224/',
  },
  transpileDependencies: true,
});
