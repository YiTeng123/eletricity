
import { journalResponse } from '@/server/interface'
import { newFormAdd, newFormAddx } from '@/global/clearForm'

export const useJournal = async (
    api: () => Promise<journalResponse>,
) => {
    return await api()
}