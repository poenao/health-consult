<template>
  <div class="index">
    <button @click="onButtonClick" type="primary">测试
      
    </button>
  </div>
</template>

<script setup>

import { request } from '../../utils/request'
const onButtonClick = () => {
     request.get('/echo')
}

</script>

<style scoped></style>
