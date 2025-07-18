

const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');

module.exports = (options)=>{

  const configPath = path.join(__dirname, '..', '..', 'configs', 'jest.config.js');

  const args = [`--config=${configPath}`, '--passWithNoTests'];

  if(options.watch){
    args.push('--watch')
  }

  spawn('jest', args, {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })
}