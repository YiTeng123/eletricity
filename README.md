# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.



## æ»è§ð¥ð¥ð¥

è¿æ¯ä¸ä¸ªæç®ç vue3è¯­æ³ç³ typescript admin ç®¡çåå°ãå®åªåå«äº Element plus & axios & svgicon & permission control & lintï¼è¿äºæ­å»ºåå°å¿è¦çä¸è¥¿ãé¨åæºä»£ç æ¯ç± [vite] å [jarvis](https://github.com/Armour/Jarvis) èªå¨çæçãMock é¨åç´æ¥ä½¿ç¨äºæé¢åæ­å»ºç [Mock æå¡å¨](https://github.com/armour/vue-typescript-admin-mock-server)ã


## é¡¹ç®åè½ð¨ð¨ð¨ 

- ð ä½¿ç¨ Vue3.2 å¼åï¼åæä»¶ç»ä»¶ `ï¼script setupï¼`è¯­æ³ç³
- ð éç¨ Vite2 ä½ä¸ºé¡¹ç®å¼åãæåå·¥å·ï¼éç½®äº Gzip æåãTSX è¯­æ³ãè·¨åä»£çãæåé¢è§å·¥å·â¦â¦ï¼
- ð æ´ä¸ªé¡¹ç®éæäº TypeScript ï¼å®å¨æ¯ä¸ºäºæ³å­¦ä¹  ð¤£ï¼
- ð ä½¿ç¨ Piniað æ¿ä»£ Vuexï¼è½»éãç®åãæç¨ï¼é¦å~ð¤¤ éæäºæä¹åæä»¶ï¼
- ð ä½¿ç¨ TypeScript å¯¹ Axios æ´ä¸ªäºæ¬¡å°è£ ï¼å¨å±éè¯¯æ¦æªãå¸¸ç¨è¯·æ±å°è£ãå¨å±è¯·æ± Loadingãï¼
- ð å¯¹é¡µé¢çæææä½åºæ¬é½å°è£æäº Hooks 
- ð ä½¿ç¨ vue-router è¿è¡è·¯ç±æéå«æ

## å¦ä½è®¾ç½®ä»¥åå¯å¨é¡¹ç® ðð

### å®è£ä¾èµð

```bash
npm install
```

### å¯å¨æ¬å°å¼åç¯å¢ï¼èªå¸¦ç­å¯å¨ï¼ð§©

```bash
npm run dev
```

### æå»ºçäº§ç¯å¢ (èªå¸¦åç¼©)ðµ

```bash
çäº§ç¯å¢
npm run build:dev
```
çäº§ç¯å¢
npm run build:pro

### æä»¶èµæºç®å½ ð
```text
electricity
ââ .vscode                # vscodeæ¨èéç½®
ââ public                 # éæèµæºæä»¶ï¼å¿½ç¥æåï¼
ââ src
â  ââ assets              # éæèµæºæä»¶
â  ââ components          # å¨å±ç»ä»¶
â  ââ config              # loadingå¨ç»éç½®
â  ââ hooks               # é¡µé¢é»è¾Hooksï¼å°è£é¡µé¢æéçæ¥å£åæ¹æ³
â  ââ router              # è·¯ç±ç®¡ç
â  ââ server              # æé¡ºåºåå«æ¯:æ¥å£å­å¸æä¸¾ãå¬å±æ¥å£ãé¡µé¢çè¯·æ±å½æ°ãäºæ¬¡å°è£axios
â  ââ store               # pinia store
â  ââ view                # é¡µé¢        
ââ App.vue                # å¥å£é¡µé¢
ââ main.ts                # å¥å£æä»¶
ââ style.css              # å¨å±css
ââ vite-env.d.ts          # vite éç½®envçå£°ææä»¶
ââ .env.development       # å¼åç¯å¢éç½®
ââ .env.production        # çäº§ç¯å¢éç½®
ââ gitignore              # é¡¹ç®æ´æ°æ¥å¿
ââ index.html             # å¥å£ html
ââ package-lock.json      # ä¾èµååçæ¬é
ââ package.json           # ä¾èµåç®¡ç
ââ README.md              # README ä»ç»
ââ tsconfig.json          # typescript å¨å±éç½®
ââ tsconfig.json          # node å¨å±éç½®
ââ vite.config.ts         # vite éç½®
```

### èªå®ä¹ Vue éç½®ð·

çè¿é [Configuration Reference](https://cli.vuejs.org/config/).

### æµè§å¨æ¯æðð

 é»è®¤æ¯æä»¥ä¸æµè§å¨ï¼vue3.2 ä¸æ¯æ IE æµè§å¨ãæ´å¤æµè§å¨å¯ä»¥æ¥ç [Can I Use Es Module](https://caniuse.com/?search=ESModule)

**ð¢ è¯·ä¸è¦ä½¿ç¨ QQ && 360 æµè§å¨å¼åï¼ä¸è¯å« æäº ES6 ä»¥ä¸è¯­æ³**

| ![Edge](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Edge.png) | ![Firefox](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Firefox.png) | ![Chrome](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Chrome.png) | ![Safari](https://iamge-1259297738.cos.ap-chengdu.myqcloud.com/md/Safari.png) |
| :-----------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
|                              last 2 versions                              |                                 last 2 versions                                 |                                last 2 versions                                |                                last 2 versions                                |


