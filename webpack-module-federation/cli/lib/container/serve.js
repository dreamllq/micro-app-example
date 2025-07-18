const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');
const getPort = require('../../utils/get-port')

module.exports = async (options)=>{
  // webpack-cli serve --config ./node_modules/@alsi/micro-app-webpack-config/container2/webpack.config.development.cjs --env port=8101
  const port = await getPort(options)
  const webpackConfigDir = require.resolve('@alsi/micro-app-webpack-config').replace(`${path.sep}index.js`,'')
  const webpackConfigPath = path.join(webpackConfigDir, 'container2', 'webpack.config.development.cjs')
  spawn('webpack-cli', ['serve', '--config', webpackConfigPath, '--env', `port=${port}`], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })
}