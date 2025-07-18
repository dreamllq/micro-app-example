import transLocale from './trans-locale';
import writeFileSync from './write-file'
import flat from './flat'
const { ESLint } = require("eslint");

export const trans = async ({ fromLang, toLangs, outDir }) => {
  const cn = flat(fromLang.locales);

  await toLangs.reduce((acc, item)=>{
    return acc.then(async ()=>{
      const message = await transLocale({locales:cn, from: fromLang.from}, item.to, item.locales);
      const code = await format(`export default ${JSON.stringify(message, null, 2)}`);
      writeFileSync(`${outDir}/${item.name}`,'index.ts', code, { flag: 'w+' });
    })
  }, Promise.resolve())
}

const format = async (code) => {
  const eslint =  new ESLint({ useEslintrc: true, fix: true });
  const results = await eslint.lintText(code);
  await ESLint.outputFixes(results);
  return results[0].output;
}