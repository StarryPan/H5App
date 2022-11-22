const {
  addLessLoader,
  fixBabelImports,
  override
} = require("customize-cra");

//生产环境去除console.* functions
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { 
          // '@primary-button-fill': '#FF0000' 
          '@brand-primary': '#975BF8',
          '@brand-primary-tap': '#4F0B6E',
          '@fill-body': '#F9F9F9',
          '@color-text-base': '#212121'
        },
      }
    }),
    fixBabelImports("babel-plugin-import", {
      libraryName: "antd-mobile",
      libraryDirectory: 'es',
      style: true
    }),
    dropConsole()
  )
};