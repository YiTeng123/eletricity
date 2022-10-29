
import { formInterface, Result } from '@/server/interface'
export const  useLogin =  <R extends Result>  (
    api: (params: FormData) => Promise<R>,
    params: formInterface
) => {
    const formdata = new FormData()
    formdata.append('account', params.account)
    formdata.append('password', params.password)
    return  api(formdata)
 
 
}
