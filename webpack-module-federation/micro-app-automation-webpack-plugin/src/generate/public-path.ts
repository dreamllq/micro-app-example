import { App } from "../type";
const fs = require('fs')
const path = require('path');
export default (apps:App[]=[])=>{
  const code = `
    export default async ()=>{
      await Promise.all([
        ${apps.filter(app=>app.remoteHost !== undefined).map(app=>{
          return `
          (async() => {
            const publicPath = await import('${app.name}/public-path');
            const app = window.__APPS__.find(app => app.name === '${app.name}');
            publicPath.set('${app.remoteHost}/app/${app.name}/')
          })()
          `
        })}
      ])
    }
  `;

  const to = path.resolve(__dirname, '../../public-path.js')
  if (fs.existsSync(to) &&
      fs.readFileSync(to, 'utf8').trim() === code.trim()) {
      return;
  }
  fs.writeFileSync(to, code);
}