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
        remoteType: 'module',
        remotes: {
          container: `promise import(window.location.origin+"/remoteEntry.js?_v="+ (window.__VERSION__? window.__VERSION__ : Date.now()))`,
          ...(Object.keys(manifest.dependencies).reduce((acc, module) => {
            acc[module] = `promise new Promise((resolve, reject)=>{
              if(!window.__APP_VERSIONS__) window.__APP_VERSIONS__ = {};
              if(!window.__APP_VERSIONS__["${module}"]) window.__APP_VERSIONS__["${module}"] = Date.now();
              const app = window.__APPS__.find(app=>app.name === \'${module}\');

              import((app.remoteHost?app.remoteHost:window.location.origin)+"/app/${module}/remoteEntry.js?_v="+ window.__APP_VERSIONS__["${module}"]).then(resolve).catch(reject);
            })`;
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