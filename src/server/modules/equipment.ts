import Api from '../api'
import http from "@/server"
import {Result, equipmentResponse} from '../interface'
/**
 * @name 设备管理模块
 */

export const equipmentApi = () => {
    return http.get<equipmentResponse>(import.meta.env.VITE_BASE_URL + Api.equipment)
} 
export const equipment_addApi=(params:FormData)=>{
    return http.post<Result>(import.meta.env.VITE_BASE_URL + Api.equipmentAdd,params)
}
export const equipment_updateApi=(params:FormData)=>{
    return http.post<Result>(import.meta.env.VITE_BASE_URL + Api.equipmentUpdate,params)
}
export const equipment_delApi=(params:FormData)=>{
    return http.post<Result>(import.meta.env.VITE_BASE_URL + Api.equipmentDelete,params)
}

