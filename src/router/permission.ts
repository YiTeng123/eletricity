import router from './'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 头部蓝色的进度条
NProgress.configure({ showSpinner: false })
// 路由守卫
const whiteList = ['/Eletricity_login']
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (sessionStorage.getItem('token')) {
        if (to.path === '/Eletricity_login') {
            next('/back_stage')
            NProgress.done()
        } else {
            next()
            NProgress.done()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
            NProgress.done()
        } else {
            next('/Eletricity_login')
            NProgress.done()
        }
    }
})
