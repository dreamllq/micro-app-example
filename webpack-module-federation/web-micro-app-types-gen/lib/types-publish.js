const { spawnSync } = require('child_process');
const process = require('process')

module.exports = ({outDir})=>{
  const {stderr, stdout} = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'publish:latest'], {cwd: outDir});
  console.log(stderr.toString());
  console.log(stdout.toString());
}