import { defineStore } from 'pinia'
import { Names } from './store-namespace'
//  pinia全局状态管理
export const useStore = defineStore(Names.stageName, {
    // 侧边栏收缩状态管理
    state:()=>{
        return{
            AsideButton: true,
            loginToken:'',
            loginLevel:'',
            loginName:'',
            loginImg:''
        }},
        // 持久化存储
        persist: {
            enabled: true,
            encryptionKey: 'my-test',
          },
    // 类似计算属性,可以修饰值
    getters:{},
    actions:{
        setAsideButton(){
            this.AsideButton=!this.AsideButton
        },
        setloginToken(res:string){
            this.loginToken=res
        },
        setloginLevel(res:string){
            this.loginLevel=res
        },
        setloginNameImg(name:string,img:string){
            this.loginName=name
            this.loginImg=img
        }
    }
})