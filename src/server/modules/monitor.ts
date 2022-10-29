import Api from '../api'
import http from "../../server"

import {monitorRequest,Result} from '../interface'

/**
 * @name 监控详情模块
 */

export const monitorList_Api=()=>{
        return http.get<monitorRequest>(import.meta.env.VITE_BASE_URL + Api.monitorList,)
}

