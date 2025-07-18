window.__LOAD_MODULE_PROMISE__ = (module) => {
  return (resolve, reject)=>{
    if(!window.__APP_VERSIONS__) window.__APP_VERSIONS__ = {};
    if(!window.__APP_VERSIONS__[module]) window.__APP_VERSIONS__[module] = Date.now();
    const app = window.__APPS__.find(app=>app.name === module);

    import((app.remoteHost?app.remoteHost:window.location.origin)+"/app/"+module+"/remoteEntry.js?_v="+ window.__APP_VERSIONS__[module]).then(resolve).catch(reject);
  }
}