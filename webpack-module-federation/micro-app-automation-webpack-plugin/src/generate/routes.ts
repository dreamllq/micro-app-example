import { App } from "../type";
const fs = require('fs')
const path = require('path');
import { camelCase } from 'change-case';
export default (apps:App[]=[])=>{
  const code = `
    ${apps.map(app=>{
      return `import ${camelCase(app.name)}Routes from '${app.name}/routes';`
    }).join('\n')}

    export default [
      ${apps.map(app=>{
        return `...${camelCase(app.name)}Routes,`
      }).join('\n')}
    ]
  `;

  const to = path.resolve(__dirname, '../../routes.js')
  if (fs.existsSync(to) &&
      fs.readFileSync(to, 'utf8').trim() === code.trim()) {
      return;
  }
  fs.writeFileSync(to, code);
}