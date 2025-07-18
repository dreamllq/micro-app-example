const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const webpackBaseConfig = require('./webpack.config.base.cjs');
const { merge } = require('webpack-merge');
const moduleFederationPluginOptions = require('./module-federation-plugin-options');
const fs = require('fs');
const process = require('process')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const os = require('os')

module.exports = (env = { port: 7777 }) => {
  console.log(env);
  const { port } = env;

  return merge(webpackBaseConfig(), {
    mode: 'development',
    devtool: 'source-map',
    output: { publicPath: 'auto' },
    plugins: [
      new ModuleFederationPlugin({
        ...moduleFederationPluginOptions('development'),
        remoteType: 'module',
        remotes: {
          container: `promise import(window.location.origin+"/remoteEntry.js?_v="+ (window.__VERSION__? window.__VERSION__ : Date.now()))`,
          ...(Object.keys(manifest.dependencies).reduce((acc, module) => {
            acc[module] = `promise new Promise(window.__LOAD_MODULE_PROMISE__("${module}"))`;
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
      bonjour: {
        type:'app',
        name: pkg.name,
        txt:{
          hostname:os.hostname()
        }
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      }
    }
  });
};