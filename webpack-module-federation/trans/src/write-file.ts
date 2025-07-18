const fs = require('fs')
const path = require('path');

export default (dir, file, data, options) => {
  if(fs.existsSync(dir) === false){
    fs.mkdirSync(dir, {recursive: true})
}
fs.writeFileSync(path.join(dir, file), data, options);
}