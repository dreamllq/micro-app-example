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
        remotes: {
          container: `promise import("/remoteEntry.js?_v="+ (window.__VERSION__? window.__VERSION__ : Date.now()))`,
          ...(Object.keys(manifest.dependencies).reduce((acc, module) => {
            acc[module] = `promise import("/app/${module}/remoteEntry.js?_v="+ (window.__APP_VERSIONS__? window.__APP_VERSIONS__["${module}"] : Date.now()))`;
            return acc;
          }, {}))
        } 
      })
    ]
  });
};