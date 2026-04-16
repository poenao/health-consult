import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'consult',
  () => {
    // 定义一个状态来存储问诊的相关信息
    const initalValue = ref({
      illnessDesc: '', // 病情描述
      illnessTime: '', // 患病时长
      consultFlag: '', // 就诊标识
      pictures: [],
    })
    // 急速类型
    const type = ref('')
    // 问诊类型
    const illnessType = ref('')
    // 科室ID
    const depId = ref('')
    // 病情缓存数据
    const illnessInfo = ref({ ...initalValue.value })
    //  患者ID
    const patientId = ref('')
    return {
      type,
      illnessType,
      depId,
      illnessInfo,
      initalValue,
      patientId,
    }
  },
  {
    persist: {
      path: ['illnessInfo', 'type', 'depId', 'illnessType', 'patientId'], // 只持久化 illnessInfo
    },
  }
)
