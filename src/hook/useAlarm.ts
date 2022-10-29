import Api from '@/server/api'
import { Result ,monitorRequest, alarmListRequest,alarmRq} from '@/server/interface'
import {newFormAdd,newFormAddx} from '@/global/clearForm'

export const useAlarm_list =  (
    api: () => Promise<alarmListRequest>,
) => {
    return  api()
}

export const useAlarmUpdate=(
    api:(params:alarmRq)=>Promise<Result>,
    params:alarmRq
)=>{
    return api(params)
}