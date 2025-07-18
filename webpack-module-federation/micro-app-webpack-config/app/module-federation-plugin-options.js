const fs = require('fs');
const path = require('path');
const process = require('process')
const moduleFederationCommonShared = require('../module-federation-common/shared')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

module.exports = (env)=>{
  const shared = {
    ...moduleFederationCommonShared,
    ...manifest.shared
  };
  
  return {
    name: pkg.name,
    filename: 'remoteEntry.js',
    exposes: {
      ...manifest.exposes,
      "./main":path.join(__dirname, '..', 'main', 'index.ts'),
      "./locales": "./src/locales/index.ts",
      "./routes": path.join(__dirname, '..', 'routes', 'index.ts'),
      "./public-path": path.join(__dirname, 'public-path.ts')
    },
    library: { type: 'module' },
    remoteType: 'module',
    shared: Object.keys(shared).reduce((acc, key)=>{
      const {devVersion, ...configs} = shared[key];
      if(devVersion){
        if(env === 'development'){
          acc[key] = {
            ...configs,
            version: devVersion
          }
          return acc;
        }
      }
      acc[key] = {
        ...configs
      }
      return acc;
    }, {})
  }
};