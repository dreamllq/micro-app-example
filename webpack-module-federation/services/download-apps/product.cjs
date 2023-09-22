var Minio = require('minio');
const exec = require('./center');
const fs = require('fs');
const path = require('path');
const appStrict = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'app-strict.json'), 'utf8'))

var minioClient = new Minio.Client({
  port: 9000,
  useSSL: false
});
exec(minioClient, Object.keys(appStrict).map((key) => ({
  name: key,
  version: appStrict[key]
})));
