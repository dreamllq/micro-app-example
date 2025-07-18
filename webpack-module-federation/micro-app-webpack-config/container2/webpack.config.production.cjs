const path = require('path');
const webpackBaseConfig = require('./webpack.config.base.cjs');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require('copy-webpack-plugin');
const moduleFederationPluginOptions = require('./module-federation-plugin-options');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

module.exports = (env = {}) => {
  console.log(env);
  var myEnv = dotenv.config({ path: process.cwd() + `/.env.production` });
  dotenvExpand.expand(myEnv);

  return merge(webpackBaseConfig({
    projectEnv: myEnv,
  }), {
    cache: false,
    mode: 'development',
    devtool: false,
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
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      flagIncludedChunks: true,
      moduleIds: 'deterministic',
      chunkIds: 'deterministic',
      concatenateModules: true,
      mangleExports: 'deterministic',
      removeAvailableModules: true,
      nodeEnv: 'production'
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: 'assets/[name].[contenthash:8].css' }),
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: '' 
          }
        ]
      }),
      new ModuleFederationPlugin({
        ...moduleFederationPluginOptions('production'),
        remoteType: 'module',
        remotes: Object.keys(manifest.dependencies).reduce((acc, module) => {
          acc[module] = `promise new Promise(window.__LOAD_MODULE_PROMISE__("${module}"))`;
          return acc;
        }, {})
      })
    ]
  });
};