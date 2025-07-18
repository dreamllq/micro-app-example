const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const webpackBaseConfig = require('./webpack.config.base.cjs');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const moduleFederationPluginOptions = require('./module-federation-plugin-options');
const mime = require('mime');
const fs = require('fs')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

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
        ...moduleFederationPluginOptions,
        remoteType: 'module',
        remotes: manifest.apps.reduce((acc, item) => {
          acc[item.name] = `promise new Promise((resolve, reject)=>{
            if(!window.__APP_VERSIONS__) window.__APP_VERSIONS__ = {};
            if(!window.__APP_VERSIONS__["${item.name}"]) window.__APP_VERSIONS__["${item.name}"] = Date.now();
            import(${item.remoteHost ? ("'" + item.remoteHost['dev']+ "'") : 'window.location.origin'}+"/app/${item.name}/remoteEntry.js?_v="+ window.__APP_VERSIONS__["${item.name}"]).then(resolve).catch(reject)
          })`;
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
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      },
      client: { overlay: false },
      proxy: {
        ...manifest.apps.reduce((acc, item) => {
          acc[`/app/${item.name}`] = {
            target: `http://127.0.0.1:${item.port}`,
            pathRewrite: { [`^/app/${item.name}`]: '' },
            onError: (err, req, res) => {
              const filePath = path.join(process.cwd() , 'public', 'app', item.name, req.path);
              res.writeHead(200, { 'Content-Type': `${mime.getType(filePath)}; charset=utf-8` }); 
              let readStream = fs.createReadStream(filePath);
              readStream.pipe(res);
            },
            logLevel: 'silent'
          };
          return acc;
        }, {})
      }
    }
  });
};