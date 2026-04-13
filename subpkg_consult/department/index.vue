<template>
  <view class="department-page">
    <scroll-view scroll-y class="department-primary">
      <view
        class="department-item"
        :class="{ active: tabIndex === index }"
        v-for="(item,index) in departmentList"
        :key="item.id"
        @click="tabIndexClick(index)"
        >{{ item.name }}</view
      >
      <view class="department-item"></view>
    </scroll-view>
    <scroll-view class="department-secondary">
      <navigator
        hover-class="none"
        url="/subpkg_consult/description/index"
        class="department-item"
      >
        普通内科
      </navigator>
    </scroll-view>
  </view>
</template>

<script setup>
  import { departmentListApi } from '@/apis/consult'
  import { ref, onMounted } from 'vue'
  // 科室列表
  const departmentList = ref([])
  // 一级科室的索引值
  const tabIndex = ref(0)
  // 获取科室列表
  const tabIndexClick = (index) => {
    tabIndex.value = index
  }
  const getDepartmentList = async () => {
    const res = await departmentListApi()
    if (res.code !== 10000)
      return uni.utils.toast(res.message || '获取科室列表失败')
    departmentList.value = res.data
  }
  onMounted(() => {
    getDepartmentList()
  })
</script>

<style lang="scss">
  @import './index.scss';
</style>
