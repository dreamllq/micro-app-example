const path = require('path')
const fs = require('fs')
const moduleFederationCommonShared = require('../module-federation-common/shared')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

module.exports = (env)=>{
  const shared = {
    ...moduleFederationCommonShared,
    ...manifest.shared
  };
  return {
    name: 'container',
    filename: 'remoteEntry.js',
    exposes: manifest.exposes,
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