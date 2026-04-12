import { defineStore } from 'pinia'
import { ref } from 'vue'
export const userInfoStore = defineStore('user', () => {
  const userInfo = ref({})
  const token = ref('')
  // 记录登录成功后要路转的地址（默认值为首页）
  const redirectUrl = ref('/pages/index/index')
  // 跳转地址时采用的 API 名称
  const openType = ref('switchTab')
  return (
    {
      token,
      userInfo,
      redirectUrl,
      openType,
    },
    {
      persist: {
        // 指定需要持久化的数据
        paths: ['token', 'userInfo', 'redirectUrl', 'openType'],
      },
    }
  )
})
