import { defineStore } from 'pinia'
import { ref } from 'vue'
export const userInfoStore = defineStore('user', () => {
  const userInfo = ref({})
  const token = ref('')
  return (
    {
      token,
         userInfo,
    },
    {
      persist: {
        // 指定需要持久化的数据
        paths: ['token'],
      },
    }
  )
})
