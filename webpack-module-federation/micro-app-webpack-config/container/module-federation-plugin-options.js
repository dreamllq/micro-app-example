const path = require('path')
const fs = require('fs')
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))
module.exports = {
  name: 'container',
  filename: 'remoteEntry.js',
  exposes: manifest.exposes,
  library: { type: 'module' },
  remoteType: 'module',
  shared: manifest.shared
};