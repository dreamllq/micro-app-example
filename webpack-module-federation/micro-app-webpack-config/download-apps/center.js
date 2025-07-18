const fs = require('fs');
const path = require('path');
const compressing = require('compressing');
const semverRsort = require('semver/functions/rsort');

module.exports = (minioClient, apps = []) => {
  const bucketName = 'frontend';

  const appsDir = path.join(process.cwd(), 'public', 'app');
  if (fs.existsSync(appsDir)) {
    fs.rmSync(appsDir, { recursive: true });
  }
  const versions = {};
  
  const getAppVersion = (app) => new Promise((resolve, reject) => {
    const prefix = `app/${app.packageName || app.name}/${app.version}`;
    var data = [];
    var stream = minioClient.listObjects(bucketName, prefix, true);
    stream.on('data', function(obj) {
      data.push(obj); 
    });
    stream.on('end', function (obj) {
      const versions = semverRsort(data.map(item => item.name.match(new RegExp(`app\/${app.packageName || app.name}\/(v.*)\/dist.zip`))[1]));
      // console.log(versions, data, prefix);
      resolve(versions[0]);
    });
    stream.on('error', function(err) {
      reject(err); 
    });
  });
  
  const download = (app) => new Promise((resolve, reject) => {
    console.log(`开始下载${app.name}`);
    const objectName = `app/${app.packageName || app.name}/${app.version}/dist.zip`;
  
    minioClient.getObject(bucketName, objectName, function(err, dataStream) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(`下载中，${app.name}`);
  
      const appDir = path.join(process.cwd(), 'public', 'app', app.name);
      fs.mkdirSync(appDir, { recursive: true });
      const filePath = path.join(appDir, 'dist.zip');
      dataStream.pipe(fs.createWriteStream(filePath)).on('close', () => {
        compressing.zip.uncompress(filePath, appDir).then(() => {
          fs.rmSync(filePath);
          resolve();
          console.log(`${app.name}-${app.version} done`);
        });
      });
    });
  });
  
  // const buildVersion = Date.now();
  Promise.all(apps.map(async app => {
    if (app.remoteHost === undefined) {

      const version = await getAppVersion(app);
      try {
        await download({
          name: app.name,
          packageName: app.packageName,
          version 
        });
        versions[app.name] = version;
      } catch (e) {
        console.error(e);
        // versions[app.name] = buildVersion;
      }
    } else {
      // versions[app.name] = buildVersion;
    }
  })).then(() => {
    const keys = Object.keys(versions)
    keys.sort();
    const _versions = keys.reduce((acc,key)=>{
      acc[key] = versions[key];
      return acc;
    },{})
    console.log(_versions);

    fs.writeFileSync(path.join(process.cwd(), 'app-versions.json'), JSON.stringify(_versions), 'utf8');
    console.log('done');
  
  }).catch(e => {
    console.error(e);
  });
};