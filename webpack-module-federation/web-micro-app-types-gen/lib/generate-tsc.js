const path = require('path');
const fs = require('fs');
const process = require('process')
const { spawnSync } = require('child_process');
const genTsconfig = require('./generate-tsconfig');
const resolveFilePath = require('./utils').resolveFilePath;

module.exports = (exposes, {outDir}) => {
  const files = Object.keys(exposes).map(exposeKey=>{
    const exposeValue = exposes[exposeKey];
    let _file = path.join(process.cwd(), exposeValue);
    return resolveFilePath(_file);
  })

  genCode(files, outDir)
}

const genCode = (files, outDir)=>{
  const command = path.join(process.cwd(), 'node_modules', '.bin', 'vue-tsc')
  genTsconfig({files, outDir});
  spawnSync(command, ['-p', path.join(__dirname, 'tsconfig.json')], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  });

  spawnSync(path.join(process.cwd(), 'node_modules', '.bin', 'resolve-tspaths'), ['-p', path.join(__dirname, 'tsconfig.json'), '--verbose'], {
    cwd: process.cwd(),
    // stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  });
}