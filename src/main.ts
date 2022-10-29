

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// pinia持久化存储
import {usePersist} from "pinia-use-persist";
import { createPinia } from 'pinia'
import  '@/view/monitor/jsmpeg.min.js'
const pinia = createPinia()
pinia.use(usePersist)
import './router/permission'
createApp(App).use(router).use(ElementPlus).use(pinia).mount('#app')
