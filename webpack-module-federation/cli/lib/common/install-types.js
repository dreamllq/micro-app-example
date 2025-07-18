const _ = require('lodash');
const { spawnSync } = require('node:child_process');

module.exports = ({ dependencies })=>{
  const pkgs = Object.keys(dependencies).map(key=>dependencies[key]).filter(obj=>_.isPlainObject(obj)).filter(item=>_.isString(item.type)).map(item=>`${item.type}@latest`);

  if(pkgs.length>0){
    spawnSync('npm', ['cache', 'clear', '-f']);
    spawnSync('npm', ['i', '--no-save', ...pkgs], {
      cwd: process.cwd(),
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: process.platform === 'win32'
    });
  }
}