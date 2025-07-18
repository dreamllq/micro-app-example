const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, ProgressPlugin } = require('webpack');
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const process = require('process')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))

module.exports = () => ({
  cache: { type: 'memory' },
  entry: path.join(process.cwd(), 'src/main.ts'),
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'assets/[name].[contenthash:6].js',
    chunkFilename: 'assets/[name].[contenthash:8].js',
    library: { type: 'module' },
    clean: true
  },
  experiments: { outputModule: true },
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.vue'
    ],
    alias: { '@': path.join(process.cwd(), 'src') }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] } 
        },
        resolve: { fullySpecified: false }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /.ts$/, 
        use: {
          loader: 'babel-loader',
          options: { presets: [['@babel/preset-typescript', { allExtensions: true }]] }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    
    ]
  },
  optimization: { splitChunks: { chunks: 'async' } },
  plugins: [
    new VueAutoRoutingPlugin({
      pages: 'src/pages',
      importPrefix: '@/pages/',
      outFile: 'src/routes/auto-routes.js',
      nested: true
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      __APP_NAME__: JSON.stringify(pkg.name),
      __VERSION__: JSON.stringify(`v${pkg.version}`)
    }),
    new MiniCssExtractPlugin({ filename: 'assets/[name].[contenthash:8].css' }),
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: false
    }),
    new VueLoaderPlugin(),
    new ProgressPlugin()
  ],
  performance: { hints: false }
});
