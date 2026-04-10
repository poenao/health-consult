<template>
  <div class="index">
    <button type="primary" @click="store.increment">+</button>
    <input class="input" type="text" v-model="store.count" readonly />
    <button type="primary" @click="store.decrement">-</button>
  </div>
</template>

<script setup>
  import { useCounterStore } from '@/stores/counter'
  const store = useCounterStore()
</script>

<style scoped lang="scss">

.input{
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid pink;
  border-radius: 4px;
  background-color: peru;
}
</style>
