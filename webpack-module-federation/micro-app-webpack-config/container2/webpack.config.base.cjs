const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin, ProvidePlugin, ProgressPlugin } = require('webpack');
const MicroAppAutomationWebpackPlugin = require('@alsi/micro-app-automation-webpack-plugin').default;
const fs = require('fs')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))
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
    new MicroAppAutomationWebpackPlugin({ apps: Object.keys(manifest.dependencies).map(appName=>{
      const temp = {name: appName};
      return temp;
    })}),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      __CONTAINER_NAME__: JSON.stringify(pkg.name),
      __VERSION__: JSON.stringify(`v${pkg.version}`)
    }),
    
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      inject: false
    }),
    new HtmlWebpackPlugin({  
      filename: 'entry.json',
      template: path.join(__dirname, 'entry.ejs'),
      inject: false
    }),
    new VueLoaderPlugin(),
    new ProgressPlugin()
  ],
  performance: { hints: false }
});
