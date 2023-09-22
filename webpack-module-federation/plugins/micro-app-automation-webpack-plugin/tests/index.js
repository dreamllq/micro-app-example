const generateLocals = require('../lib/generate/locales')
const generateMain = require('../lib/generate/main')

const apps = [{name:'dps'},{name:'sys-aaa', remoteHost:'http://a.b.c'}]
generateLocals.default(apps)
generateMain.default(apps)