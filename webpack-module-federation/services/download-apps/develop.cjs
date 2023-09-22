var Minio = require('minio');
const https = require('https');
const exec = require('./center');
const fs = require('fs');
const path = require('path');
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))

var minioClient = new Minio.Client({

  port: 9000,
  useSSL: false
});

exec(minioClient, manifest.apps);

