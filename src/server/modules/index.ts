import Api from '../api'
import http from "@/server"
import {userRequest ,Result,indexResponse} from '../interface'
/**
 * @name 首页模块
 */
 export const indexApi = () => {
    return http.get<indexResponse>(import.meta.env.VITE_BASE_URL+Api.indexList)
} 


export type indexEcinter={
    cnt:number,
    name:string
}
type indexecRes=Result&{
    alarmRank:indexEcinter[]
}
export const indexEcApi=(parmas:any)=>{
    return http.get<indexecRes>(import.meta.env.VITE_BASE_URL+Api.indexEcharts,parmas)
}
export const indexEcfirstApi=(parmas:any)=>{
    return http.get<indexecRes>(import.meta.env.VITE_BASE_URL+Api.indexFirst,parmas)
}