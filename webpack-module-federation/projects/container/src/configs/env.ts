const NODE_ENV = process.env.NODE_ENV;
let API_HOST = '';
let OAUTH_HOST = '';
let WSS_HOST = '';
let CLIENT_ID = '';
let CLIENT_SECRET = '';
let MINIO_END_POINT = '';
let MINIO_ACCESS_KEY = '';
let MINIO_SECRET_KEY = '';
let MINIO_BUCKET = '';
let ANDROID_MINIO_BUCKET = '';
let ANDROID_MINIO_OBJECT = '';


if (process.env.NODE_ENV === 'development') {
  const key = 'web-dev-env';
  const env = localStorage.getItem(key) || 'dev';
  const ENV_ENUM = {
    dev: 'DEV',
    test: 'TEST'
  };
  const ENV = ENV_ENUM[env] || 'DEV';

  API_HOST = import.meta.env[`VITE_API_HOST_${ENV}`];
  OAUTH_HOST = import.meta.env[`VITE_OAUTH_HOST_${ENV}`];
  WSS_HOST = import.meta.env[`VITE_WSS_HOST_${ENV}`];
  CLIENT_ID = import.meta.env[`VITE_CLIENT_ID_${ENV}`];
  CLIENT_SECRET = import.meta.env[`VITE_CLIENT_SECRET_${ENV}`];

  MINIO_END_POINT = import.meta.env[`VITE_MINIO_END_POINT_${ENV}`],
  MINIO_ACCESS_KEY = import.meta.env[`VITE_MINIO_ACCESS_KEY_${ENV}`],
  MINIO_SECRET_KEY = import.meta.env[`VITE_MINIO_SECRET_KEY_${ENV}`],
  MINIO_BUCKET = import.meta.env[`VITE_MINIO_BUCKET_${ENV}`];

  ANDROID_MINIO_BUCKET = import.meta.env[`VITE_ANDROID_MINIO_BUCKET_${ENV}`];
  ANDROID_MINIO_OBJECT = import.meta.env[`VITE_ANDROID_MINIO_OBJECT_${ENV}`];

  console.log('env', ENV, {
    API_HOST,
    OAUTH_HOST,
    WSS_HOST,
    CLIENT_ID,
    CLIENT_SECRET,
    MINIO_END_POINT,
    MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY,
    MINIO_BUCKET,
    ANDROID_MINIO_BUCKET,
    ANDROID_MINIO_OBJECT 
  });
} else {
  API_HOST = import.meta.env.VITE_API_HOST;
  OAUTH_HOST = import.meta.env.VITE_OAUTH_HOST;
  WSS_HOST = import.meta.env.VITE_WSS_HOST;
  CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

  MINIO_END_POINT = import.meta.env.VITE_MINIO_END_POINT,
  MINIO_ACCESS_KEY = import.meta.env.VITE_MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY = import.meta.env.VITE_MINIO_SECRET_KEY,
  MINIO_BUCKET = import.meta.env.VITE_MINIO_BUCKET;

  ANDROID_MINIO_BUCKET = import.meta.env['VITE_ANDROID_MINIO_BUCKET'];
  ANDROID_MINIO_OBJECT = import.meta.env['VITE_ANDROID_MINIO_OBJECT'];
}

export {
  API_HOST,
  OAUTH_HOST,
  WSS_HOST,
  CLIENT_ID,
  CLIENT_SECRET,
  MINIO_END_POINT,
  MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY,
  MINIO_BUCKET,
  ANDROID_MINIO_BUCKET,
  ANDROID_MINIO_OBJECT,
  NODE_ENV
};

