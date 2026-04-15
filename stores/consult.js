import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'consult',
  () => {
    // 定义一个状态来存储问诊的相关信息
    const consultData = ref({
      illnessDesc: '', // 病情描述
      illnessTime: '', // 患病时长
      consultFlag: '', // 就诊标识
      pictures: [],
    })
    // 病情缓存数据
    const consultInfo = ref({ ...consultData.value })
    return {
      consultData,
      consultInfo,
    }
  },
  {
    persist: {
      path: 'consultData', // 只持久化 consultData
    },
  }
)
