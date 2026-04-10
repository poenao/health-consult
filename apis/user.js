import { request } from '../utils/request'
/**
 * 发送验证码
 */

export const verifyCodeApi = (data) => {
  return request.get('/code', { params: data })
}

/**
 * 用户登录接口（短信验证码方式）
 */
export const loginByMobileApi = (data) => {
  return request.post('/login', data)
}