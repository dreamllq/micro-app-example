const fs = require('fs');
const path = require('path');
const compressing = require('compressing');
const semverRsort = require('semver/functions/rsort');

module.exports = (minioClient, container) => {
  const bucketName = 'frontend';
  
  const getAppVersion = (container) => new Promise((resolve, reject) => {
    const prefix = `container/${container.name}/${container.version}`;
    var data = [];
    var stream = minioClient.listObjects(bucketName, prefix, true);
    stream.on('data', function(obj) {
      data.push(obj); 
    });
    stream.on('end', function (obj) {
      const versions = semverRsort(data.map(item => item.name.match(new RegExp(`container\/${container.name}\/(v.*)\/dist.zip`))[1]));
      // console.log(versions, data, prefix);
      resolve(versions[0]);
    });
    stream.on('error', function(err) {
      reject(err); 
    });
  });
  
  const download = (container) => new Promise((resolve, reject) => {
    console.log(`开始下载${container.name}`);
    const objectName = `container/${container.name}/${container.version}/dist.zip`;
  
    minioClient.getObject(bucketName, objectName, function(err, dataStream) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log(`下载中，${container.name}`);
  
      const containerDir = path.join(process.cwd(), 'public');
      fs.mkdirSync(containerDir, { recursive: true });
      const filePath = path.join(containerDir, 'dist.zip');
      dataStream.pipe(fs.createWriteStream(filePath)).on('close', () => {
        compressing.zip.uncompress(filePath, containerDir).then(() => {
          fs.rmSync(filePath);
          resolve(null);
          console.log(`${container.name}-${container.version} done`);
        });
      });
    });
  });

  const main = async ()=>{
    const version = await getAppVersion(container);
    try {
      await download({
        name: container.name,
        version 
      });
      return version
    } catch (e) {
      console.error(e);
    }
  }

  main().then((version)=>{
    fs.writeFileSync(path.join(process.cwd(), 'container-version.json'), JSON.stringify(version), 'utf8');
  });
  
  // const buildVersion = Date.now();
  // Promise.all(apps.map(async app => {
  //   if (app.remoteHost === undefined) {

  //     const version = await getAppVersion(app);
  //     try {
  //       await download({
  //         name: app.name,
  //         version 
  //       });
  //       versions[app.name] = version;
  //     } catch (e) {
  //       console.error(e);
  //       // versions[app.name] = buildVersion;
  //     }
  //   } else {
  //     // versions[app.name] = buildVersion;
  //   }
  // })).then(() => {
  //   const keys = Object.keys(versions)
  //   keys.sort();
  //   const _versions = keys.reduce((acc,key)=>{
  //     acc[key] = versions[key];
  //     return acc;
  //   },{})
  //   console.log(_versions);

  //   fs.writeFileSync(path.join(process.cwd(), 'app-versions.json'), JSON.stringify(_versions), 'utf8');
  //   console.log('done');
  
  // }).catch(e => {
  //   console.error(e);
  // });
};