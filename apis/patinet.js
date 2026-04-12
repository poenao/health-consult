import { request } from '@/utils/request'

/**
 * 添加患者（家庭档案）
 */
export const addPatientApi = (data) => {
  return request.post('/patient/add', data)
}

/**
 * 获取患者（家庭档案）列表
 */
export const patientListApi = () => {
  return request.get('/patient/mylist')
}