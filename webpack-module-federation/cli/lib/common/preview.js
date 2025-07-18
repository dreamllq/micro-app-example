const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');
const bonjour = require('bonjour');
const getPort = require('../../utils/get-port')
const LOG_COLOR = require('../../constants/log-color')

module.exports = async (options)=>{
  const bonjourClient = bonjour();
  const port = await getPort(options)
  const service = bonjourClient.publish({ name: options.name, type: options.type, port: port })
  // http-server dist -p 8101 -g -c-1
  const proc = spawn('http-server', ['dist', '-p', String(port), '-g', '-c-1', '-s'], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })

  console.log(LOG_COLOR.LOG_MSEEAGE_COLOR, options.type, options.name, `http://127.0.0.1:${port}`, LOG_COLOR.CLEAR_STYLE_CODE);

  proc.on("exit", ()=>{
    console.log('exit');
    service.stop(()=>{
      process.exit(0)
    })
  })

  proc.on('close', ()=>{
    console.log(('close'));
    service.stop(()=>{
      process.exit(0)
    })
  })

  process.on('SIGINT',()=>{
    service.stop(()=>{
      process.exit(0)
    })
  })
}