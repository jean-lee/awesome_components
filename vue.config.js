const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)


module.exports = {
  outputDir: 'dist',
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  css: {
    extract: IS_PROD // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"] // 加入ts 和 tsx
    },
  },
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复HMR
  },
  devServer: {
    port: '8090'
  }
};