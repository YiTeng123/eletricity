import Api from '../api'
import http from "../../server/index"
import { Result, ResultData } from '../interface'


/**
 * @name 登录模块
 */
// * 用户登录接口

export namespace Login {
    export interface loginRequest extends Result {
        level: string,
        user: string,
        access_token: string,
        img:string,
        
    }
}
// Promise的泛型T代表promise变成成功态之后resolve的值，resolve(value):T


// interface ResultData<T = any> extends Result {
// 	data?: T;
// }
// post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
//     return this.service.post(url, params);
// }

export const loginApi = (params: FormData) => {
    return http.post<Login.loginRequest>(import.meta.env.VITE_BASE_URL + Api.login, params)
} 