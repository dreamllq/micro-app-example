const path = require('path');
const fs = require('fs');
const { spawnSync } = require('node:child_process');
const mvSync = require('../../../utils/mv.js')

module.exports = async (options)=>{
  // alsi download
  // node scripts/gen-app-versions.js 
  // node scripts/replace-html.js 
  // rm -rf dist 
  //  mv public dist
  console.log('download');
  spawnSync('alsi', ['download'], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })

  console.log('生成version.js');
  spawnSync('node', [path.join(__dirname,'gen-app-versions.js')], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })

  // 拷贝common.js
  fs.cpSync(path.join(__dirname, '..', 'common.js'), path.join(process.cwd(), 'public', 'common.js'));

  console.log('替换index.html内容');
  spawnSync('node', [path.join(__dirname,'replace-html.js')], {
    cwd: process.cwd(),
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: process.platform === 'win32'
  })

  console.log('拷贝构建结果');
  if(fs.existsSync(path.join(process.cwd(), 'dist'))){
    fs.rmSync(path.join(process.cwd(), 'dist'), {recursive: true, force:true});
  }
  mvSync(path.join(process.cwd(), 'public'), path.join(process.cwd(), 'dist'))
}