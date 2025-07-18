const path = require('path');
const fs = require('fs');
const { spawnSync } = require('node:child_process');
const cp = require('cp')

module.exports = (options)=>{
  // webpack --config ./node_modules/@alsi/micro-app-webpack-config/app/webpack.config.production.cjs && cp manifest.json dist && cp package.json dist
  const webpackConfigDir = require.resolve('@alsi/micro-app-webpack-config').replace(`${path.sep}index.js`,'')
  const webpackConfigPath = path.join(webpackConfigDir, 'app', 'webpack.config.production.cjs')
  spawnSync('webpack-cli', ['--config', webpackConfigPath], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  });
  cp.sync(path.join(process.cwd(), 'manifest.json'), path.join(process.cwd(), 'dist', 'manifest.json'))
  cp.sync(path.join(process.cwd(), 'package.json'), path.join(process.cwd(), 'dist', 'package.json'))
}