const generateRoutes = require('../lib/generate/routes')
const generateLocals = require('../lib/generate/locales')
const generatePublicPath = require('../lib/generate/public-path')
const generateMain = require('../lib/generate/main')

const apps = [{name:'dps'},{name:'sys-aaa', remoteHost:'http://a.b.c'}]
generateRoutes.default(apps)
generateLocals.default(apps)
generatePublicPath.default(apps)
generateMain.default(apps)