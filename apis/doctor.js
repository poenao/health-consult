// 导入封装好的网络请求模块
import { request } from '@/utils/request'

/**
 * 首页知识列表
 */
export const feedListApi = (data) => {
  return request.get('/patient/home/knowledge', { params: data })
}

/**
 * 推荐医生列表
 */
export const doctorListApi = (current = 1, pageSize = 5) => {
  return request.get('/home/page/doc', { params: { current, pageSize } })
}
