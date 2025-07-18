const portfinder = require('portfinder')

const defaultPort = 9000

module.exports = async (options)=>{
  portfinder.basePort = options.port || process.env.PORT || defaultPort
  const port = await portfinder.getPortPromise();
  return port
}