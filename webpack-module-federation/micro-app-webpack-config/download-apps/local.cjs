var Minio = require('minio');
const https = require('https');
const exec = require('./center');
const fs = require('fs');
const path = require('path');
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

var minioClient = new Minio.Client({
  endPoint: 'file.uat.alsi.cn',
  accessKey: 'developer',
  secretKey: 'developer@ASDL-APS'
});

exec(minioClient, manifest.apps);

