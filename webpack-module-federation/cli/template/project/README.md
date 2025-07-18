# APS

## dev 开发配置

### 环境变量

跟目录创建 .env.development

```
PROXY_HOST = https://aps.dev.alsi.cn
```

### 自定义环境变量

需要自定义环境的时候创建，直接只用现有环境，无需创建，主要用于服务端本地调试用途

跟目录创建 env.js

```
window.__APS_ENV__ = {
  RUNTIME_ENV: "test",
  API_HOST: "https://api.sit.alsi.cn",
  OAUTH_HOST: "https://oauth.sit.alsi.cn",
  WSS_HOST: "wss://api.sit.alsi.cn",
  CLIENT_ID: "aps_system",
  CLIENT_SECRET: "123456",
  MINIO_END_POINT: "file.sit.alsi.cn",
  MINIO_BUCKET: "test",
  CUSTOMIZATION_API_HOST: "https://custom.sit.alsi.cn",
  UNI_APP_VERSION: "1.4.3"
};
```



