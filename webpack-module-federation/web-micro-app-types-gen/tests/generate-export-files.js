const generateExportFiles = require('../lib/generate-export-files')
const path = require('path')

const exposes = {
  "./components/a": "./tests/exposes/components/a",
  "./components/b": "./tests/exposes/components/b/index",
  "./components/c": "./tests/exposes/components/index.vue",
  "./components/d": "./tests/exposes/components/index.js",
  "./components/e": "./tests/exposes/components/b/out.js",
  "./constants/a": "./tests/exposes/constants/a.ts",
  "./constants/b": "./tests/exposes/constants/b",
  "./b": "./tests/exposes/constants/b",
}

const outDir = path.join(__dirname, 'exposes-types')
generateExportFiles(exposes, {outDir})