import { PluginOptions } from "./type";
import generateRoutes from './generate/routes'
import generateLocals from './generate/locales'
import generatePublicPath from './generate/public-path'
import generateMain from './generate/main'


const pluginName = 'MicroApAutomationWebpackPlugin';

class MicroApAutomationWebpackPlugin {
  options: PluginOptions

  constructor(options) {
    this.options = options;
  }

  apply(compiler){

    const generate = ()=>{
      generateRoutes(this.options.apps)
      generateLocals(this.options.apps)
      generatePublicPath(this.options.apps),
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