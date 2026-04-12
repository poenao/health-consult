// ...existing code...
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userInfoStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const token = ref('')
    const redirectUrl = ref('/pages/index/index')
    const openType = ref('switchTab')

    // 正确返回状态对象
    return {
      token,
      userInfo,
      redirectUrl,
      openType,
    }
  },
  {
    // persist 作为 defineStore 的选项传入
    persist: {
      paths: ['token', 'userInfo', 'redirectUrl', 'openType'],
    },
  }
)
// ...existing code...
