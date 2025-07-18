const { cosmiconfigSync } = require('cosmiconfig');
const explorerSync = cosmiconfigSync('alsi')
const result = explorerSync.search();

module.exports = ()=>{
  if(result){
    return result.config
  } else {
    return {}
  }
}