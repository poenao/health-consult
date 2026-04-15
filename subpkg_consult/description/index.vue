<template>
  <scroll-page>
    <view class="description-page">
      <!-- 在线医生 -->
      <view class="doctor-online">
        <image
          src="/static/uploads/doctor-avatar-2.png"
          class="doctor-avatar"
        />
        <view class="doctor-info">
          <view class="name">在线医生</view>
          <view class="message">
            请描述你的疾病或症状、是否用药、就诊经历，需要我听过什么样的帮助
          </view>
          <view class="tips">
            <text class="iconfont icon-shield"></text>
            内容仅医生可见
          </view>
        </view>
      </view>
      <!-- 患者信息 -->
      <view class="patient-info">
        <view class="description">
          <uni-easyinput
            v-model="illnessInfo.illnessDesc"
            type="textarea"
            :styles="{ backgroundColor: '#f6f6f6' }"
            :input-border="false"
            placeholder-style="font-size: 30rpx; color: #979797"
            placeholder="请详细描述您的病情,病情描述不能为空"
          />
        </view>

        <view class="title">本次患病多久了？</view>
        <view class="tags">
          <text
            class="tag"
            :class="{ active: illnessInfo.illnessTime === item.value }"
            v-for="item in illnessTimes"
            :key="item.value"
            @click="onFlagTagClick(item.value)"
            >{{ item.text }}</text
          >
        </view>

        <view class="title">此次病情是否去医院就诊过？</view>
        <view class="tags">
          <text
            class="tag"
            :class="{ active: illnessInfo.consultFlag === item.value }"
            v-for="item in consultFlags"
            :key="item.value"
            @click="onConsultFlagClick(item.value)"
            >{{ item.text }}</text
          >
        </view>
      </view>
      <!-- 上传图片 -->
      <view class="patient-picture">
        <uni-file-picker
          title="上传病情相关图片 (仅医生可见)"
          v-model="illnessInfo.pictures"
          limit="8"
          :image-styles="{ width: '160rpx', height: '160rpx' }"
          file-extname="png,jpg,gif,webp"
        />
      </view>
    </view>
    <!-- 下一步操作 -->
    <view class="next-step">
      <button
        :disabled="!nextStepEnable"
        class="uni-button"
        @click="onNextStep"
      >
        下一步
      </button>
    </view>
  </scroll-page>
</template>
<script setup>
  import { ref, computed } from 'vue'
  import { useConsultStore } from '../../stores/consult'
  // 病情描述信息
  const illnessInfo = ref({
    illnessDesc: '', // 病情描述
    illnessTime: '', // 患病时长
    consultFlag: '', // 是否就诊过
    // 接收上传到云空间的图片
    pictures: [],
  })
  // 患病时长
  const illnessTimes = [
    { value: 1, text: '一周内' },
    { value: 2, text: '一月内' },
    { value: 3, text: '半年内' },
    { value: 4, text: '半年以上' },
  ]
  // 是否就诊过
  const consultFlags = [
    { value: 1, text: '就诊过' },
    { value: 0, text: '没有就诊过' },
  ]

  // 记录用户选择的患病时长数据
  const onFlagTagClick = (value) => {
    illnessInfo.value.illnessTime = value
  }
  // 记录用户选择的就诊标识数据
  const onConsultFlagClick = (value) => {
    illnessInfo.value.consultFlag = value
  }

  const nextStepEnable = computed(() => {
    // 只有当病情描述、患病时长、就诊标识都填写后才允许进入下一步
    return (
      illnessInfo.value.illnessDesc.trim() !== '' &&
      illnessInfo.value.illnessTime !== '' &&
      illnessInfo.value.consultFlag !== ''
    )
  })
  // 下一步操作以后把问诊所有数据保存到pinia状态管理中
  const store = useConsultStore()
  const onNextStep = () => {
    store.consultData = illnessInfo.value
  }
  // 提示用户是否恢复之前填写的病情数据
  if (store.consultData) {
    // 这里可以弹出提示框询问用户是否恢复数据
    uni.showModal({
      title: '提示',
      content: '是否恢复之前填写的病情数据？',
      success: (res) => {
        if (res.confirm) {
          illnessInfo.value = store.consultData
        } else {
          // 用户选择不恢复数据，可以清空之前的数据
          store.consultData = {}
        }
      },
    })
  }
</script>
<style lang="scss">
  @import './index.scss';
</style>
