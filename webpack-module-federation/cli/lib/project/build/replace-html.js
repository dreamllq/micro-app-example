const path = require('path');
const fs = require('fs')
const genHtml =require('../common/gen-html')

const entryJsonPath = path.join(process.cwd(), 'public', 'entry.json');

if(fs.existsSync(entryJsonPath)){
  const entryConfig = JSON.parse(fs.readFileSync(entryJsonPath, 'utf8'))
  const fp = path.join(process.cwd(), 'public', 'index.html')
  let html = fs.readFileSync(fp, 'utf8')
  fs.writeFileSync(fp, genHtml(entryConfig, html), 'utf8')
} else {
  const fp = path.join(process.cwd(), 'public', 'index.html')
  let html = fs.readFileSync(fp, 'utf8')
  
  const v = Date.now()
  html = html.replace('<!-- EnvScripts -->', `
    <script src="/env.js?_v=${v}"></script>
    <script src="/version.js?_v=${v}"></script>
    <script src="/common.js?_v=${v}"></script>
  `)
  
  fs.writeFileSync(fp, html, 'utf8')
}