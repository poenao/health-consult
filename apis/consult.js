import { request } from '@/utils/request'
/**
 * 医生科室列表
 */
export const departmentListApi = () => {
  return request.get('/dep/all')
}

/**
 * 生成预支付订单
 */
export const preOrderApi = (type, options = {}) => {
  return request.get('/patient/consult/order/pre', {
    params: {
      type,
      ...options,
    },
  })
}
