
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('node:child_process');
const getConfig = require('../../utils/get-config');
const lodash = require('lodash')

module.exports = (options)=>{
  // alsi-micro-app-types-gen --npmGroupName @aaa && alsi-micro-app-types-publish
  const config = getConfig()
  const genParams = [];
  const npmGroupName = lodash.get(config, 'types.npmGroupName')
  if(npmGroupName){
    genParams.push('--npmGroupName')
    genParams.push(npmGroupName)
  }
  spawnSync('alsi-micro-app-types-gen', genParams, {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  });

  if(options.autoPublish){
    spawnSync('alsi-micro-app-types-publish', [], {
      cwd: process.cwd(),
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: process.platform === 'win32'
    });
  }
}