<script setup>
  import { ref } from 'vue'
  import { patientListApi } from '../../apis/patinet'

  // 侧滑选项删除患者
  const swipeOptions = ref([
    {
      text: '删除',
      style: {
        backgroundColor: '#dd524d',
      },
    },
  ])

  //是否展示页面内容
  const showContent = ref(false)
  // 患者列表数据
  const patientList = ref([])

  const getPatientList = async () => {
    const res = await patientListApi()
    patientList.value = res.data || []
    if (res.code !== 10000)
      return uni.utils.toast(res.message || '获取患者列表失败')
    showContent.value = true
  }

  getPatientList()
</script>

<template>
  <scroll-page>
    <view class="archive-page" v-if="showContent">
      <view class="archive-tips">最多可添加6人</view>
      <uni-swipe-action>
        <uni-swipe-action-item
          v-for="item in patientList"
          :key="item.id"
          :right-options="swipeOptions"
        >
          <view class="archive-card active">
            <view class="archive-info">
              <text class="name">{{ item.name }}</text>
              <text class="id-card">{{
                item.idCard.replace(/(.{4})(.*)(.{4})/, '$1***********$3')
              }}</text>
              <text class="default">默认</text>
            </view>
            <view class="archive-info">
              <text class="gender">{{ item.gender === 1 ? '男' : '女' }}</text>
              <text class="age">{{ item.age }}岁</text>
            </view>
            <navigator
              hover-class="none"
              class="edit-link"
              :url="`/subpkg_archive/form/index?id=${item.id}`"
            >
              <uni-icons
                type="icon-edit"
                size="20"
                color="#16C2A3"
                custom-prefix="iconfont"
              />
            </navigator>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>

      <!-- 添加按钮 -->
      <view v-if="patientList.length < 6" class="archive-card">
        <navigator
          class="add-link"
          hover-class="none"
          url="/subpkg_archive/form/index"
        >
          <uni-icons color="#16C2A3" size="24" type="plusempty" />
          <text class="label">添加患者</text>
        </navigator>
      </view>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './index.scss';
</style>
