import Api from '../api'
import http from "@/server"
import {userRequest ,Result, journalResponse} from '../interface'
/**
 * @name 日志管理模块
 */

 export const journalApi = () => {
    return http.get<journalResponse>(import.meta.env.VITE_BASE_URL + Api.journalList)
} 