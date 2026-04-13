<template>
  <view class="department-page">
    <scroll-view scroll-y class="department-primary">
      <view
        class="department-item"
        :class="{ active: tabIndex === index }"
        v-for="(item, index) in departmentList"
        :key="item.id"
        @click="tabIndexClick(index)"
      >
        {{ item.name }}
      </view>
    </scroll-view>

    <scroll-view scroll-y class="department-secondary">
      <navigator
        v-for="child in childDepartmentList"
        :key="child.id"
        hover-class="navigator-hover"
        :url="`/subpkg_consult/description/index?id=${child.id}`"
        class="department-item"
      >
        {{ child.name }}
      </navigator>

      <view v-if="childDepartmentList.length === 0" class="empty-state">
        暂无子科室数据
      </view>
    </scroll-view>
  </view>
</template>
<script setup>
  import { departmentListApi } from '@/apis/consult'
  import { ref, onMounted, computed } from 'vue'
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
  // 二级科室列表通过计算属性获取
  const childDepartmentList = computed(() => {
    return departmentList.value[tabIndex.value].child || []
  })
  onMounted(() => {
    getDepartmentList()
  })
</script>

<style lang="scss">
  @import './index.scss';
</style>
