import Api from '../api'
import http from "@/server"
import {userRequest ,Result, alarmListRequest,alarmRq} from '../interface'
/**
 * @name 报警列表模块
 */

export const alarmList_APi=( )=>{
    return http.get<alarmListRequest>(import.meta.env.VITE_BASE_URL + Api.alarmList)
}
export const alarmUpdate_Api=(params:alarmRq)=>{
    return http.post<Result>(import.meta.env.VITE_BASE_URL + Api.alarmUpdate,params)
}