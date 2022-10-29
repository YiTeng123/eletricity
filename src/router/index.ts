//引入路由对象
import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    // component: () => import('../view/login.vue'),
    redirect: to => {
        // 方法接收目标路由作为参数
        // return 重定向的字符串路径/路径对象,这里需略过compoent配置项
        return { path: '/Eletricity_login' }
    },
},
{
    path: '/Eletricity_login',
    name: 'Eletricity_login',
    component: () => import('../view/login/login.vue')

},
{
    path: '/back_stage',
    name: 'back_stage',
    redirect:'/back_stage/index',
    component: () => import('../view/main.vue'),
    children: [
        {
            path: 'index',
            name: 'index',
            component: () => import('../view/index/index.vue')
        },
        {
            path: 'monitor',
            name: 'monitor',
            component: () => import('../view/monitor/monitor.vue')
        },
        {
            path: 'equipment',
            name: 'equipment',
            component: () => import('../view/equipment/equipment.vue')
        },
        {
            path: 'algorithm',
            name: 'algorithm',
            component: () => import('../view/algorithm/algorithm.vue')
        },
        {
            path: 'user',
            name: 'user',
            component: () => import('../view/user/user.vue')
        },
        {
            path: 'alarm',
            name: 'alarm',
            component: () => import('../view/alarm/alarm.vue')
        },
        {
            path: 'journal',
            name: 'journal',
            component: () => import('../view/journal/journal.vue')
        },
    ]

}
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

//导出router
export default router