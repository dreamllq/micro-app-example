const fs = require('fs');
const path = require('path');
const resolveFilePath = require('./utils').resolveFilePath;

module.exports = (exposes, {outDir})=>{
  Object.keys(exposes).forEach(exposeKey=>{
    try{
      const exposeValue = exposes[exposeKey]
      const filePath = path.join(outDir,exposeKey);
      const importFilePath = resolveFilePath(path.join(process.cwd(), exposeValue)).replace(process.cwd(), outDir);
    
      const newDirPath = path.join(filePath, '..');
      // console.log(newDirPath);
      if(!fs.existsSync(newDirPath)){
        fs.mkdirSync(path.join(filePath, '..'), {recursive: true});
      }
      const newFileName = `${path.basename(exposeKey)}.d.ts`;

      const relativeImportFilePathTemp = path.relative(newDirPath, importFilePath)
      const relativeImportFilePath = relativeImportFilePathTemp.startsWith('..')?relativeImportFilePathTemp:`./${relativeImportFilePathTemp}`;
      const fileContent = `
export {default} from '${relativeImportFilePath}'
export * from '${relativeImportFilePath}'
      `;
      fs.writeFileSync(path.join(newDirPath, newFileName), fileContent, 'utf-8');
    } catch(e){
      console.log('[generate-export-files ERROR]', e);
    }

  })
}