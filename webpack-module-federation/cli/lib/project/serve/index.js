const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');
const getPort = require('../../../utils/get-port')

module.exports = async (options)=>{
  // node
  const port = await getPort(options)
  spawn('node', [path.join(__dirname, 'proxy.js'), '-p', String(port)], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })
}