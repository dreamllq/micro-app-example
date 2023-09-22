# micro app

## 应用配置

- 项目git的仓库名称必须为 scpo-sys-micro-${name}, 其中${name}为应用名称
- 修改 package.json 中name属性为应用名称
- 修改 package.json 中 dev 和 preview 的端口号，端口号需要在运行的项目中唯一，不能与其他应用端口号重复
- 配置项目的 webhook
    - URL：https://devops.dev.alsi.cn/gitee-project/frontend/micro-app-pipline
    - 密码：eb6830402b6d077d74320c0dbde3982b
    - 事件只勾选推送标签
- 生成新版本
    - 开发开始
        - hotfix：npm version prerelease
        - 功能迭代：npm version preminor
    - 开发过程中：npm version prerelease
    - 封板：npm version patch

## 文件说明

### main.ts

- 应用的配置信息，最后在项目入口中进行整合，代码中通过 `import { appsData } from '@alsi/micro-framework-sdk';` 进行使用；
- export保留字段
    - routes：微应用路由配置
    - menu：微应用提供的菜单集合
    - roleConfig： 微应用对应的角色相关配置
    - permissionKeys：微应用的权限资源集合

### locales/index.ts

- 国际化配置，最后在项目入口中进行整合，代码中通过 `import { i18n } from '@alsi/micro-framework-sdk';` 进行使用
- 目前支持：zhCn、en、ja

### manifest.json

- dependencies：定义依赖的其他模块，key为模块名
- shared：webpack 模块联邦对应的配置，查看[模块联邦](https://www.webpackjs.com/concepts/module-federation/)相关配置说明
- exposes：webpack 模块联邦对应的配置，查看[模块联邦](https://www.webpackjs.com/concepts/module-federation/)相关配置说明
