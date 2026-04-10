// 导入模块
import request from 'luch-request'

// 实例化网络请求
const request = new Request({
  baseURL: 'https://consult-api.itheima.net', // 基础URL
  timeout: 5000, // 请求超时时间
})

export { request }
