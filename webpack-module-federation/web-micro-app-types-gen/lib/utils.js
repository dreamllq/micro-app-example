const fs = require('fs');
const path = require('path');
const configs = require('./configs')

module.exports.resolveFilePath = (_file)=>{
  const extname = path.extname(_file);
  if(extname === ''){
    const maybeAvailableFiles = [];
    configs.defaultExt.forEach(ext=>{
      maybeAvailableFiles.push(`${_file}${ext}`);
    })
    configs.defaultFileName.forEach(fn=>{
      configs.defaultExt.forEach(ext=>{
        maybeAvailableFiles.push(`${path.join(_file, fn)}${ext}`);
      })
    })

    return maybeAvailableFiles.find(maf=>fs.existsSync(maf)) || _file;
  }
  return _file;
}

module.exports.getDTSFilePath = (_file)=>{
  const basename = path.basename(_file);
  const extname = path.extname(_file)
  if(configs.vueTscSupportExtensions.includes(extname)){
    return path.join(_file, '..', `${basename}.d.ts`);
  } else if(configs.tscSupportExtensions.includes(extname)){
    return path.join(_file, '..', `${basename.replace(extname, '')}.d.ts`);
  } else {
    return null
  }
}