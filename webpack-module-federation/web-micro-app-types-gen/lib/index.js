const path = require('path');
const fs = require('fs');
const process = require('process')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

const generateTsc  = require('./generate-tsc')
const generatePkg = require('./generate-pkg')
const typesPublish = require('./types-publish')
const generateExportFiles = require('./generate-export-files')

const outDir = path.join(__dirname, '..', 'exposes-types');

module.exports = ({npmGroupName})=>{
  const exposes = {
    "./locales": "./src/locales/index.ts",
    ...manifest.exposes
  };
  generateTsc(exposes, {outDir});
  generateExportFiles(exposes, {outDir});
  generatePkg({name: pkg.name, version:pkg.version, groupName:npmGroupName, exposes}, {outDir});
}

module.exports.publish = ()=>{
  typesPublish({outDir})
}
