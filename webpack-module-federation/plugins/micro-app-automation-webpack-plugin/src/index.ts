import { PluginOptions } from "./type";
import generateLocals from './generate/locales'
import generateMain from './generate/main'


const pluginName = 'MicroApAutomationWebpackPlugin';

class MicroApAutomationWebpackPlugin {
  options: PluginOptions

  constructor(options) {
    this.options = options;
  }

  apply(compiler){

    const generate = ()=>{
      generateLocals(this.options.apps)
      generateMain(this.options.apps)
    }

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      try {
          generate();
      }
      catch (error) {
          compilation.errors.push(error);
      }
  });
  }
}

export default MicroApAutomationWebpackPlugin;