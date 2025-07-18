const path = require('path');
const fs = require('fs')
const appVersions = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'app-versions.json'), 'utf8'))
const containerVersion = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'container-version.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

// window.__APP_VERSIONS__
// window.__VERSION__

fs.writeFileSync(path.join(process.cwd(), 'public', 'version.js'), `
  window.__APP_VERSIONS__ = ${JSON.stringify(appVersions)}
  window.__VERSION__ = ${JSON.stringify(containerVersion)}
  window.__APPS__ = ${JSON.stringify(manifest.apps)}
  window.__PROJECT_VERSIONS__ = {
    container: window.__VERSION__,
    apps: window.__APP_VERSIONS__
  }
  console.log(window.__PROJECT_VERSIONS__)
`);