// 导入模块
import Request from 'luch-request'
import { userInfoStore } from '../stores/user'

const store = userInfoStore
// 实例化网络请求
const request = new Request({
  baseURL: 'https://consult-api.itheima.net', // 基础URL
  timeout: 5000, // 请求超时时间
  custom: {
    loading: true, // 是否显示加载提示
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在请求头中添加Authorization字段，携带token
    const token = store.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)
export { request }
