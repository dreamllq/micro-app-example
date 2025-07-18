const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const webpackBaseConfig = require('./webpack.config.base.cjs');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const moduleFederationPluginOptions = require('./module-federation-plugin-options');
// const mime = require('mime');
const fs = require('fs')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))

module.exports = (env = { port: 8080 }) => {
  console.log(env);
  var myEnv = dotenv.config({ path: process.cwd() + '/.env.development' });
  dotenvExpand.expand(myEnv);

  return merge(webpackBaseConfig({
    projectEnv: myEnv,
  }), {
    cache: { type: 'memory' },
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          resolve: { fullySpecified: false }
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new ModuleFederationPlugin({
        ...moduleFederationPluginOptions('development'),
        remoteType: 'module',
        remotes: Object.keys(manifest.dependencies).reduce((acc, module) => {
          acc[module] = `promise new Promise(window.__LOAD_MODULE_PROMISE__("${module}"))`;
          return acc;
        }, {})
      })
    ],
    devServer: {
      static: { directory: path.join(process.cwd(), 'public') },
      host: '127.0.0.1',
      compress: true,
      port: env.port,
      hot: true,
      historyApiFallback: true,
      bonjour: {
        type:'container',
        name: pkg.name
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      },
      client: { overlay: false },
    }
  });
};