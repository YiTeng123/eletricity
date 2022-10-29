import Api from '@/server/api'
import { equipmentResponse, Result } from '@/server/interface'
import { newFormAdd, newFormAddx } from '@/global/clearForm'

export const useEquipment = async (
    api: () => Promise<equipmentResponse>,
) => {
    return await api()
}

export type equForm = {
    [index: string]: any,
    name: string,
    desc?: string,
    algorithm: string,
    ip_path: string,
    ip_path_copy?: string
    equipment_status: string,
    uuid?: string
}
export const useEquipment_add = (
    api: (params: FormData) => Promise<Result>,
    params: equForm
) => {
    return api(newFormAdd(params))
}
export const useEquipment_update = (
    api: (params: FormData) => Promise<Result>,
    params: equForm
) => {
    return api(newFormAdd(params))
}
export const useEquipment_delete = (
    api: (params: FormData) => Promise<Result>,
    params: equForm
    ) => { 
        return api(newFormAddx(params,'uuid'))
    }