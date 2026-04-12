import { request } from '@/utils/request'

/**
 * 添加患者（家庭档案）
 */
export const addPatientApi = (data) => {
  return request.post('/patient/add', data)
}
