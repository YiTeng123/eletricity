

import Api from '@/server/api'
import { Result } from '@/server/interface'
import {newFormAdd,newFormAddx} from '@/global/clearForm'
export const upload_userImg = import.meta.env.VITE_BASE_URL + Api.upload_image
export interface useraddform {
    [index: string]: any
    nickname: string
    account: string,
    level: string,
    img: string,
    statuss: string
}


export const useUser = async <R extends Result>(
    api: () => Promise<R>,
) => {
    return await api()
}
export const useUserAdd = <Result>(
    api: (params: FormData) => Promise<Result>,
    params: useraddform
) => {
    const formdata= newFormAdd(params)


    return api(formdata)

}
export type userupadateForm = {
    // 索引签名，保证这个数据结构是对象
    [key: string]: string;
    nickname: string
    account: string,

    level: string,
    img: string,
    statuss: string
}
export const use_userUpdate = <Result>(
    api: (params: FormData) => Promise<Result>,
    params: userupadateForm
) => {
    const formdata= newFormAddx(params,'nickname','account','level','img','statuss')
    return api(formdata)
}
export const use_userdel = <Result>(
    api: (params: FormData) => Promise<Result>,
    params: string
) => {
    const form = new FormData()
    form.append('account', params)
    return api(form)
}

export type resetPwd={
    [index: string]: string
    account:string,
    password:string
}
export const use_resetPwd=<Result>(
    // api是传进来的函数，parmas是未表单化的对象
    api:(params:FormData)=>Promise<Result>,
    params:resetPwd
)=>{
    const formdata =newFormAddx(params,'account')
    return api(formdata)
}