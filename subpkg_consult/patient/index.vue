<template>
  <scroll-page v-if="pageShow">
    <view class="patient-page">
      <view class="page-header">
        <view class="patient-title"> 请选择患者信息 </view>
        <view class="patient-tips">
          以便医生给出更准确的治疗，信息仅医生可见
        </view>
      </view>
      <uni-swipe-action>
        <uni-swipe-action-item
          v-for="(patient, index) in patientList"
          :key="patient.id"
          :right-options="swipeOptions"
        >
          <view
            @click="onPatientCardClick(index)"
            class="archive-card"
            :class="patientIndex === index ? 'active' : ''"
          >
            <view class="archive-info">
              <text class="name">{{ patient.name }}</text>
              <text class="id-card">
                {{
                  patient.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2')
                }}</text
              >
              <text v-if="patient.defaultFlag === 1" class="default">默认</text>
            </view>
            <view class="archive-info">
              <text class="gender">{{ patient.genderValue }}</text>
              <text class="age">{{ patient.age }}岁</text>
            </view>
            <navigator
              hover-class="none"
              class="edit-link"
              :url="`/subpkg_archive/add/index?id=${patient.id}`"
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
    <!-- 下一步操作 -->
    <view class="next-step">
      <navigator class="uni-button" url="/subpkg_consult/payment/index">
        下一步
      </navigator>
    </view>
  </scroll-page>
</template>
<script setup>
  // 侧滑按钮配置
  const swipeOptions = ref([
    {
      text: '删除',
      style: {
        backgroundColor: '#dd524d',
      },
    },
  ])
  import { computed, ref } from 'vue'
  import { patientListApi } from '../../apis/patinet'
  // 患者列表
  const patientList = ref()
  // 是否显示页面内容
  const pageShow = ref(false)
  // 患者卡片索引值
  const patientIndex = ref(0)
  // 计算属性获得患者ID
  const patientId = computed(() => {
    return patientList.value ? patientList.value[patientIndex.value].id : null
  })
  // 点击患者卡片事件
  const onPatientCardClick = (index) => {
    console.log(index)
    patientIndex.value = index
  }

  const getPatientList = async () => {
    const res = await patientListApi()
    if (!res.code === 10000)
      return uni.utils.toast(res.message || '获取患者列表失败')
    patientList.value = res.data
    pageShow.value = true
  }
  getPatientList()
</script>
<style lang="scss">
  @import './index.scss';
</style>
