const path = require('path');
const fs = require('fs');
module.exports = ({name, version, groupName='@alsi-microapp-types', exposes}, { outDir })=>{
  const packageJson = {
    "name": `${groupName}/${name}`,
    "version": `${version}`,
    "scripts": {
      "publish:latest": "npm publish --registry=https://repo.dev.alsi.cn/repository/aps-npm-snapshot/"
    },
    "types": "index.d.ts",
    "dependencies":{}
  };

  const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));

  if(pkg.dependencies['@alsi/aps-api']){
    packageJson.dependencies['@alsi/aps-api'] = pkg.dependencies['@alsi/aps-api'];
  }


  fs.writeFileSync(path.join(outDir, 'package.json'), JSON.stringify(packageJson, null,2), 'utf8')
}
