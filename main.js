import { createSSRApp } from 'vue'
// 导入 Pinia
import { createPinia } from 'pinia'
// Pinia 持久化插件
import piniaPluginPersistedstate, {
  createPersistedState,
} from 'pinia-plugin-persistedstate'
import App from './App'
import '@/utils/utils'

export function createApp() {
  const app = createSSRApp(App)
  // 创建 Pinia 实例
  const pinia = createPinia()
  // 使用 Pinia 持久化插件
  // pinia.use(piniaPluginPersistedstate)
  pinia.use(
    // 自定义 Pinia 插件
    createPersistedState({
      // 自定义本地存储的逻辑
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    })
  )
  app.use(pinia)

  return {
    app,
  }
}
