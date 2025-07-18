const path = require('path');
const fs = require('fs')

const tscSupportExtensions = ['.ts', '.tsx', '.d.ts', '.js', '.jsx', '.cts', '.d.cts', '.cjs', '.mts', '.d.mts', '.mjs']
const vueTscSupportExtensions = ['.vue']

module.exports = ({file=null, outDir, files=[]})=>{
  const repoTsconfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'tsconfig.json'), 'utf8'))
  const tsconfig = {
    "compilerOptions": {
      "declaration": true,
      "emitDeclarationOnly": true,
      "allowJs": true,
      "strict": false,
      "noImplicitAny": false,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "module": "ESNext",
      "target": "ESNext",
      "moduleResolution": "node",
      "outDir": outDir,
      "rootDir": process.cwd(),
      // "outFile":path.join(outDir, 'index'),
      // "tsBuildInfoFile":'.tsbuildinfo',
      // "composite":false,
      // "incremental":false,
      "baseUrl": genBaseUrl(repoTsconfig.compilerOptions.baseUrl),
      "paths": repoTsconfig.compilerOptions.paths,
    }
  }

  if(file){
    tsconfig.include = [file]
  } else if(files){
    tsconfig.include = files;
  }

  fs.writeFileSync(path.join(__dirname, 'tsconfig.json'), JSON.stringify(tsconfig,null, 2));
}

const genBaseUrl = (baseUrl)=>{
  if(baseUrl){
    return path.join(process.cwd(), baseUrl)
  } else {
    return process.cwd()
  }
}