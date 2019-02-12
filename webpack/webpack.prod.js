const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {pages, templates, chunkPermutaions} = require('./utils.js')

const allPermutations = chunkPermutaions(Object.keys(pages))

const prodConfig={
  mode: 'production',
  module: {
    rules: [
      {test: /\.css$/,  use: [MiniCssExtractPlugin.loader,{loader:'css-loader',options:{modules:true,localIdentName:"[name]__[local]-[hash:base64:5]"}},{loader:'postcss-loader'},]},
      {test: /\.scss$/, use: [MiniCssExtractPlugin.loader,{loader:'css-loader',options:{modules:true,localIdentName:"[name]__[local]-[hash:base64:5]"}},{loader:'postcss-loader'},{loader:'sass-loader'}]},
      {test: /\.less$/, exclude:/node_modules/,use: [MiniCssExtractPlugin.loader,{loader:'css-loader',options:{modules:true}},{loader:'postcss-loader'},{loader:'less-loader', options:{javascriptEnabled:true}}]},
      {test: /\.less$/, include:/node_modules/,use: [MiniCssExtractPlugin.loader,{loader:'css-loader'},{loader:'postcss-loader'},{loader:'less-loader', options:{javascriptEnabled:true}}]},      
    ]
  },
  optimization: {
    // runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all', //1.
      automaticNameDelimiter: '~',
      // name: true,
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:  'css/[name].[hash].css',
    }),
    // new BundleAnalyzerPlugin(),
    // new HTMLWebpackPlugin({
    //   template: path.resolve(__dirname,"../src/views/Index/index.html"),
    //   filename: "index.html",
    //   chunks: ['index']
    // }),
    // new HTMLWebpackPlugin({
    //   template: path.resolve(__dirname,"../src/views/Test/index.html"),
    //   filename: "test.html",
    //   chunks: ['test']
    // }),
    new CleanWebpackPlugin([path.resolve(__dirname,'../dist/*')],{allowExternal:true})
  ],
}

Object.keys(pages).map(filename => {
  const chunks = allPermutations.filter(item => item.match(filename))
  chunks.push(filename)
  prodConfig.plugins.push(new HTMLWebpackPlugin({
    template: templates[filename],
    filename: `${filename.toLowerCase()}.html`,
    chunks
  }))
})

module.exports = merge(commonConfig, prodConfig)
