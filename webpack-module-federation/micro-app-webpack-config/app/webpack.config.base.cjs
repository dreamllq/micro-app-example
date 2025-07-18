const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, ProgressPlugin } = require('webpack');
const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const process = require('process')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

module.exports = () => ({
  cache: { type: 'memory' },
  entry: {
    [pkg.name]: path.join(__dirname, 'public-path.ts')
  },
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
          loader: require.resolve('babel-loader'),
          options: { presets: ['@babel/preset-env'] } 
        },
        resolve: { fullySpecified: false }
      },
      {
        test: /\.vue$/,
        use: require.resolve('vue-loader')
      },
      {
        test: /.tsx?$/, 
        use: {
          loader: require.resolve('babel-loader'),
          options: { 
            presets: [['@babel/preset-typescript', { allExtensions: true, isTSX: true }]], 
            plugins: ["@vue/babel-plugin-jsx"] 
          }
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
          require.resolve('css-loader'),
          require.resolve('postcss-loader'),
          {
            loader: require.resolve("sass-loader"),
            options: {
              implementation: require("sass"),
              sassOptions: {
                outputStyle: 'expanded',
                silenceDeprecations: ['legacy-js-api'],
              },
            },
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type:'asset/inline'
      }
    ],
    noParse: [require.resolve('typescript/lib/typescript.js')]
  },
  optimization: { splitChunks: { chunks: 'async' } },
  plugins: [
    new VueAutoRoutingPlugin({
      pages: 'src/pages',
      importPrefix: '@/pages/',
      outFile: path.join(__dirname, '..', 'routes', 'auto-routes.js'),
      nested: true
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
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
