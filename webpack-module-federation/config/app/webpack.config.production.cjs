const webpackBaseConfig = require('./webpack.config.base.cjs');
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require('copy-webpack-plugin');
const moduleFederationPluginOptions = require('./module-federation-plugin-options');
const fs = require('fs');
const path = require('path');
const process = require('process')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

module.exports = (env = {}) => {
  console.log(env);
  return merge(webpackBaseConfig(), {
    mode: 'production',
    devtool: false,
    output: { publicPath: `/app/${pkg.name}/` },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: '' 
          }      
        ]
      }),
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
    ]
  });
};