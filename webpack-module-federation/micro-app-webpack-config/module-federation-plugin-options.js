const fs = require('fs');
const path = require('path');
const process = require('process')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

module.exports = {
  name: pkg.name,
  filename: 'remoteEntry.js',
  exposes: manifest.exposes,
  library: { type: 'module' },
  remoteType: 'module',
  shared: manifest.shared
};