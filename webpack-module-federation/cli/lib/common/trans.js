

const path = require('path');
const fs = require('fs');
const { spawn } = require('node:child_process');

module.exports = (options)=>{
  // alsi-trans -cn src/locales/zh-cn/index.ts -en src/locales/en/index.ts -ja src/locales/ja/index.ts -o src/locales
  spawn('alsi-trans', [
    '-cn', 
    'src/locales/zh-cn/index.ts',
    '-en',
    'src/locales/en/index.ts',
    '-ja',
    'src/locales/ja/index.ts',
    '-o',
    'src/locales'
  ], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })
}