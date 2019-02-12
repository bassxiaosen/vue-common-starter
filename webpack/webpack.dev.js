const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common.js')
const {pages, templates} = require('./utils.js')

const devConfig={
  mode: 'development',
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {test: /\.css$/,  use: ['style-loader' ,{loader:'css-loader',options:{modules:true,localIdentName:"[name]__[local]-[hash:base64:5]"}},{loader:'postcss-loader'},]},
      {test: /\.scss$/, use: ['style-loader' ,{loader:'css-loader',options:{modules:true,localIdentName:"[name]__[local]-[hash:base64:5]"}},{loader:'postcss-loader'},{loader:'sass-loader'}]},
      {test: /\.less$/, exclude:/node_modules/,use: ['style-loader' ,{loader:'css-loader',options:{modules:true}},{loader:'postcss-loader'},{loader:'less-loader', options:{javascriptEnabled:true}}]},
      {test: /\.less$/, include:/node_modules/,use: ['style-loader' ,{loader:'css-loader'},{loader:'postcss-loader'},{loader:'less-loader', options:{javascriptEnabled:true}}]},      
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new HTMLWebpackPlugin({
    //   template: path.resolve(__dirname,"../src/views/Index/index.html"),
    //   filename: "index.html",
    //   chunks: ['index']
    // }),
    // new HTMLWebpackPlugin({
    //   template: path.resolve(__dirname,"../src/views/Test/test.html"),
    //   filename: "index.html",
    //   chunks: ['test']
    // })
  ],
  devServer: {
    proxy: {'/api': 'http://localhost:3000'},
    hot: true,
    historyApiFallback: true,
    port: 9966,
    overlay: true,
  }
}
Object.keys(pages).map(filename => {
  devConfig.plugins.push(new HTMLWebpackPlugin({
    template: templates[filename],
    filename: `${filename.toLowerCase()}.html`,
    chunks: [`${filename}`]
  }))
})

module.exports = merge(commonConfig, devConfig)
