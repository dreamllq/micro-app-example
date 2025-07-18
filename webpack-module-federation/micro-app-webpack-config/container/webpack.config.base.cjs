const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, ProvidePlugin, ProgressPlugin } = require('webpack');
const MicroApAutomationWebpackPlugin = require('@alsi/micro-app-automation-webpack-plugin').default;
const fs = require('fs')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))
const appVersions = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'app-versions.json'), 'utf8'))
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))

module.exports = ({ projectEnv = {} }) => ({
  entry: path.join(process.cwd(), 'src/main.ts'),
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'assets/[name].[contenthash:6].js',
    chunkFilename: 'assets/[name].[contenthash:8].js',
    publicPath: '/',
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
    alias: {
      '@':  path.join(process.cwd(), 'src')
    }
  },
  module: {
    rules: [
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
        test: /\.(ttf|eot|woff|woff2)$/,
        type:'asset/inline'
      }
    ],
    noParse: [require.resolve('typescript/lib/typescript.js')]
  },
  plugins: [
    new MicroApAutomationWebpackPlugin({ apps: manifest.apps.map(app=>{
      const temp = {name: app.name};
      if(app.remoteHost){
        temp.remoteHost = app.remoteHost
      }
      return temp;
    }) }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      __PROJECT__: JSON.stringify({
        name: pkg.name,
        version: pkg.version
      }),
      __APPS__: JSON.stringify(manifest.apps.map(item => ({
        name: item.name,
        version: item.version,
        remoteHost: item.remoteHost ? item.remoteHost : undefined
      }))),
      __APP_VERSIONS__: JSON.stringify(appVersions),
      'import.meta.env': Object.keys(projectEnv.parsed).reduce((acc, key) => {
        acc[key] = JSON.stringify(projectEnv.parsed[key]); return acc; 
      }, {}),
      __VERSION__: JSON.stringify(Date.now()),
      ...Object.keys(projectEnv.parsed).reduce((acc, key) => {
        acc[key] = JSON.stringify(projectEnv.parsed[key]); return acc; 
      }, {})
    }),
    
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: false
    }),
    new VueLoaderPlugin(),
    new ProgressPlugin()
  ],
  performance: { hints: false }
});
