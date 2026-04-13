import { request } from '@/utils/request'
/**
 * 医生科室列表
 */
export const departmentListApi = () => {
  return request.get('/dep/all')
}
