const path = require('path');
const fs = require('fs');
const mvSync = require('../../utils/mv.js')

module.exports = (options)=>{
  const templateDir = path.join(__dirname, '..', '..', 'template', 'app');
  fs.cpSync(templateDir, options.dir, {recursive: true, force: true});
  fs.renameSync(path.join(options.dir, '_eslintrc.cjs'), path.join(options.dir, '.eslintrc.cjs'))
  fs.renameSync(path.join(options.dir, '_gitignore'), path.join(options.dir, '.gitignore'))
  fs.renameSync(path.join(options.dir, '_npmrc'), path.join(options.dir, '.npmrc'))
  mvSync(path.join(options.dir, '_vscode'), path.join(options.dir, '.vscode'))
  fs.rmSync(path.join(options.dir, '_vscode'), {force:true, recursive:true})
}