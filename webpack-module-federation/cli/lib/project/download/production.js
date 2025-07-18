const path = require('path');
const fs = require('fs');
const { spawnSync } = require('node:child_process');

module.exports = (options)=>{
  if(fs.existsSync(path.join(process.cwd(), 'public'))){
    fs.rmSync(path.join(process.cwd(), 'public'), {recursive: true, force:true});
  }
  // node ./node_modules/@alsi/micro-app-webpack-config/download-container/develop.cjs && node ./node_modules/@alsi/micro-app-webpack-config/download-apps/develop.cjs
  const webpackConfigDir = require.resolve('@alsi/micro-app-webpack-config').replace(`${path.sep}index.js`,'')
  const containerDownloadPath = path.join(webpackConfigDir, 'download-container', 'develop.cjs')
  
  spawnSync('node', [containerDownloadPath], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })

  const appsDownloadPath = path.join(webpackConfigDir, 'download-apps', 'develop.cjs');
  spawnSync('node', [appsDownloadPath], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })
}