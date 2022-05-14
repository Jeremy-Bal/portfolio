/* const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
}) */
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
    .rule('gltf')
    .test(/\.glb|gltf$/)
    .use('file-loader')
    .loader('file-loader')
    .end()

    config.module
    .rule('glsl')
    .test(/\.glsl$/)
    .use('webpack-glsl-loader')
    .loader('webpack-glsl-loader')
  }
}