import Api from '@/server/api'
import { Result ,monitorRequest} from '@/server/interface'
import {newFormAdd,newFormAddx} from '@/global/clearForm'

export const useJMonitor_list =  (
    api: () => Promise<monitorRequest>,
) => {
    return  api()
}