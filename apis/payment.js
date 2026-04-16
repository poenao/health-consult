import { request } from '@/utils/request'

/**
 * 三方支付（暂时只支持支付宝支付）
 */
export const orderPayApi = (data) => {
  return request.post('/patient/consult/pay', data)
}
