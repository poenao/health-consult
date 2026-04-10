import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  // 定义一个函数来增加计数器的值
  const increment = () => {
    count.value++
  }
  const decrement = () => {
    count.value--
  }
  return {
    count,
    increment,
    decrement,
  }
})
