import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { Result, ResultData } from "./interface";
import { showFullScreenLoading, tryHideFullScreenLoading } from "../config/serviceLoading";

import { useStore } from '../store'

import { useRouter } from 'vue-router'
// 路由二次封装
const router = useRouter()
const store = useStore()
const config = {
    baseURL: import.meta.env.VITE_BASE_URL as string,
    timeout: 5000 as number,
    // 跨域时候允许携带凭证
    // withCredentials: true
}

class RequestHttp {
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // 生成axios实例
        this.service = axios.create(config)
        /**
         * @description 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig | any) => {
                if (config.url !== '/Eletricity_login') {
                    config.headers.Authorization =`Bearer ${sessionStorage.getItem("token")}`
                } else {
                    ElMessage.error(`账号密码，请重新登录`)
                }
                config.headers!.noLoading || showFullScreenLoading();
                // const token: string = globalStore.token;
                // return { ...config, headers: { ...config.headers, "x-access-token": 'sdas' } };
                config.headers['Access-Control-Allow-Origin'] = '*'
                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
        /**
         * @description 响应拦截器
         *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data, data: { access_token, level }, config } = response;
                setTimeout(() => {
                    tryHideFullScreenLoading();
                }, 200);
                if (data.code == 55555) {
                    ElMessage.error('状态失效');
                    router.replace({
                        path: "/login"
                    });
                    return Promise.reject(data);
                }
                if (data.resp_code === 11000) {
                    setTimeout(() => {
                        ElMessage.success('登录成功');

                    }, 800);

                    //   保存token和权限
                    store.setloginToken(access_token)
                    store.setloginLevel(level)
                    console.log(store.loginLevel + '===========>');

                    // 这个地方return会跳出整个拦截器,导致后续的await获取不到值
                    // return
                }

                return data;
            },

            (error: AxiosError) => {
                const respons: any = error;
                // console.log('dawjdguag=====>' + (response as any)[1]);
                console.log('dawjdguag=====>' + respons);
                setTimeout(() => {
                    tryHideFullScreenLoading();
                }, 500);

                // 请求超时单独判断，因为请求超时没有 response
                if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
                Promise.reject(error).catch(() => {

                    ElMessage.error(error.message);

                });
                return Promise.reject(error);
            }
        );
    }

    // 封装常用的axios请求
    get<T extends Result>(url: string, params?: any, _object = {}): Promise<T> {
        return this.service.get(url, { params, });
    }
    post<T extends Result>(url: string, params?: any, _object = {}): Promise<T> {
        return this.service.post(url, params);
    }
}

export default new RequestHttp(config)

