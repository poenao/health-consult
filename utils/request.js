// 导入模块
import Request from 'luch-request'
import { userInfoStore } from '@/stores/user.js'
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
// 接口白名单
const whiteList = ['/code', '/login', '/login/password']
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 显示加载状态提示
    const store = userInfoStore()
    // 全局默认的头信息（方便以后扩展）
    const defaultHeader = {}
    // 判断是否存在 token 并且不在接口白单当中
    if (store.token && !whiteList.includes(config.url)) {
      defaultHeader.Authorization = 'Bearer ' + store.token
    }
    // 合并全局头信息和局部头信息（局部优先级高全局）
    config.header = {
      ...defaultHeader,
      ...config.header,
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
      relogin()
    }
    return response.data
  },
  (error) => {
    // 【重点】如果后端直接抛出 401 HTTP 状态码，逻辑会跳到这里！
    if (error.statusCode === 401 || error.errMsg?.includes('401')) {
      uni.utils.toast('登录状态已过期，请重新登录')
      relogin()
    }
    // 处理响应错误
    return Promise.reject(error)
  }
)

// 引导用户重新登录
const relogin = () => {
  const store = userInfoStore()
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
  // 修改为：
  uni.redirectTo({
    url: '/pages/login/index',
  })
}
export { request }
