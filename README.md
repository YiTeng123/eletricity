# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.



## 总览🔥🔥🔥

这是一个极简的 vue3语法糖 typescript admin 管理后台。它只包含了 Element plus & axios & svgicon & permission control & lint，这些搭建后台必要的东西。部分源代码是由 [vite] 和 [jarvis](https://github.com/Armour/Jarvis) 自动生成的。Mock 部分直接使用了我预先搭建的 [Mock 服务器](https://github.com/armour/vue-typescript-admin-mock-server)。


## 项目功能🔨🔨🔨 

- 🚀 使用 Vue3.2 开发，单文件组件 `＜script setup＞`语法糖
- 🚀 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、TSX 语法、跨域代理、打包预览工具……）
- 🚀 整个项目集成了 TypeScript （完全是为了想学习 🤣）
- 🚀 使用 Pinia🍍 替代 Vuex，轻量、简单、易用（香啊~🤤 集成了持久化插件）
- 🚀 使用 TypeScript 对 Axios 整个二次封装 （全局错误拦截、常用请求封装、全局请求 Loading、）
- 🚀 对页面的所有操作基本都封装成了 Hooks 
- 🚀 使用 vue-router 进行路由权限劫持

## 如何设置以及启动项目 🎉🎉

### 安装依赖📔

```bash
npm install
```

### 启动本地开发环境（自带热启动）🧩

```bash
npm run dev
```

### 构建生产环境 (自带压缩)🍵

```bash
生产环境
npm run build:dev
```
生产环境
npm run build:pro

### 文件资源目录 📚
```text
electricity
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # loading动画配置
│  ├─ hooks               # 页面逻辑Hooks，封装页面所需的接口和方法
│  ├─ router              # 路由管理
│  ├─ server              # 按顺序分别是:接口字典枚举、公共接口、页面的请求函数、二次封装axios
│  ├─ store               # pinia store
│  └─ view                # 页面        
├─ App.vue                # 入口页面
├─ main.ts                # 入口文件
├─ style.css              # 全局css
├─ vite-env.d.ts          # vite 配置env的声明文件
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ gitignore              # 项目更新日志
├─ index.html             # 入口 html
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
├─ tsconfig.json          # node 全局配置
└─ vite.config.ts         # vite 配置
```

### 自定义 Vue 配置📷

看这里 [Configuration Reference](https://cli.vuejs.org/config/).

### 浏览器支持🚀🚀

 默认支持以下浏览器，vue3.2 不支持 IE 浏览器。更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)

**💢 请不要使用 QQ && 360 浏览器开发，不识别 某些 ES6 以上语法**

| ![Edge](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Edge.png) | ![Firefox](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Firefox.png) | ![Chrome](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Chrome.png) | ![Safari](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Safari.png) |
| :-----------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
|                              last 2 versions                              |                                 last 2 versions                                 |                                last 2 versions                                |                                last 2 versions                                |


