// 导入模块
import Request from 'luch-request'
import { userInfoStore } from '../stores/user'

const store = userInfoStore
// tabBar页面路径
const tabBarList = [
  'pages/index/index',
  'pages/wiki/index',
  'pages/notify/index',
  'pages/my/index',
]
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
    // 如果响应状态码是401，说明token无效或过期，提示用户重新登录
    if (response.statusCode === 401) {
      uni.utils.toast('登录状态已过期，请重新登录!')
      relogin()
      return Promise.reject(new Error('Unauthorized'))
    }
    return response.data
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

// 引导用户重新登录
const relogin = () => {
  // 动态读取当前页面的路径
  const pageStack = getCurrentPages()
  const currentPage = pageStack[pageStack.length - 1]
  // 完整的路由包含地址的参数
  const redirectURL = currentPage.$page.fullPath
  // 判断当前页面是否在tabBar中然后选择合适的跳转方式
  const openType = tabBarList.includes(currentPage.route)
    ? 'switchTab'
    : 'navigateTo'
  //把上一页的页面地址和处理过的跳转方式传递给pinia
  store.redirectURL = redirectURL
  store.openType = openType
  // 跳转到登录页面
  uni.redirectURL('/pages/login/index')
}
export { request }
