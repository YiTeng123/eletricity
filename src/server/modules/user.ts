import Api from '../api'
import http from "../../server"

import {userRequest ,Result} from '../interface'


/**
 * @name 用户管理模块
 */
export const userApi = () => {
    return http.get<userRequest>(import.meta.env.VITE_BASE_URL + Api.userList)
} 
export const useraddApi=(parmas:FormData)=>{
    return http.post<Result>(import.meta.env.VITE_BASE_URL + Api.userListAdd,parmas)
}

export const update_userApi=(parmas:FormData)=>{
    return http.post<Result>(import.meta.env.VITE_BASE_URL + Api.updateUser,parmas)
}
export const userdelApi=(parmas:FormData)=>{
    return  http.post<Result>(import.meta.env.VITE_BASE_URL + Api.userdel,parmas)
}
export const userRestpwdApi=(parmas:FormData)=>{
    return  http.post<Result>(import.meta.env.VITE_BASE_URL + Api.user_reset,parmas)
}