import { request } from '../utils/request'
/**
 * 发送验证码
 */

export const verifyCodeApi = (data) => {
  return request.get('/code', {
    params: data,
  })
}

/**
 * 用户登录接口（短信验证码方式）
 */
export const loginByMobileApi = (data) => {
  return request.post('/login', data)
}
/**
 * 用户登录接口（密码方式）
 */
export const loginByPassword = (data) => {
  return request.post('/login/password', data)
}

/**
 * 获取用户信息
 */
export const userInfoApi = () => {
  return request.get('/patient/myUser')
}
