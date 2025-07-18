const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const webpackBaseConfig = require('./webpack.config.base.cjs');
const { merge } = require('webpack-merge');
const moduleFederationPluginOptions = require('./module-federation-plugin-options');
const fs = require('fs');
const process = require('process')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

module.exports = (env = { port: 7777 }) => {
  console.log(env);
  const { port } = env;

  return merge(webpackBaseConfig(), {
    mode: 'development',
    devtool: 'source-map',
    output: { publicPath: 'auto' },
    plugins: [
      new ModuleFederationPlugin({
        ...moduleFederationPluginOptions,
        remotes: {
          container: `promise import("/remoteEntry.js?_v="+ (window.__VERSION__? window.__VERSION__ : Date.now()))`,
          ...(Object.keys(manifest.dependencies).reduce((acc, module) => {
            acc[module] = `promise import("/app/${module}/remoteEntry.js?_v="+ (window.__APP_VERSIONS__? window.__APP_VERSIONS__["${module}"] : Date.now()))`;
            return acc;
          }, {}))
        } 
      })
    ],
    devServer: {
      static: { directory: path.join(process.cwd(), 'public') },
      client:{overlay: false},
      host: '127.0.0.1',
      compress: true,
      port: port,
      hot: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      }
    }
  });
};