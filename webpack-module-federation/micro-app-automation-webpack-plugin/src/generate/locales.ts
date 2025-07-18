import { App } from "../type";
const fs = require('fs')
const path = require('path');
import { camelCase } from 'change-case';

export default (apps:App[]=[])=>{
  const code = `
    import { isArray, mergeWith, isObject } from 'lodash';

    ${apps.map(app=>{
      return `import * as ${camelCase(app.name)} from '${app.name}/locales';`
    }).join('\n')}

    const toObject = (module) => Object.keys(module).reduce((acc, key) => {
      acc[key] = module[key];
      return acc;
    }, {});
    
    const customizer = (objValue, srcValue) => {
      if (isArray(objValue) && isArray(srcValue)) {
        return objValue.concat(srcValue);
      } else if (isObject(objValue) && isObject(srcValue)) {
        return mergeWith(toObject(objValue), toObject(srcValue), customizer);
      }
    };

    export default mergeWith(
      ${apps.map(app=>{
        return `toObject(${camelCase(app.name)}),`
      }).join('\n')}
      customizer
    )
  `;

  const to = path.resolve(__dirname, '../../locales.js')
  if (fs.existsSync(to) &&
      fs.readFileSync(to, 'utf8').trim() === code.trim()) {
      return;
  }
  fs.writeFileSync(to, code);
}