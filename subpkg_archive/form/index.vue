<script setup>
  import { ref } from 'vue'
  // 表单数据
  const fromData = ref({
    name: '',
    idCard: '',
    gender: 1,
    isDefault: 0,
  })
</script>

<template>
  <scroll-page>
    <view class="archive-page">
      <uni-forms border label-width="220rpx" ref="form">
        <uni-forms-item label="患者姓名" name="name">
          <uni-easyinput
            placeholder-style="color: #C3C3C5; font-size: 32rpx"
            :styles="{ color: '#121826' }"
            :input-border="false"
            :clearable="false"
            placeholder="请填写真实姓名"
            v-model="fromData.name"
          />
        </uni-forms-item>
        <uni-forms-item label="患者身份证号" name="idCard">
          <uni-easyinput
            placeholder-style="color: #C3C3C5; font-size: 32rpx"
            :styles="{ color: '#121826' }"
            :input-border="false"
            :clearable="false"
            placeholder="请填写身份证号"
            v-model="fromData.idCard"
          />
        </uni-forms-item>
        <uni-forms-item label="患者性别" name="gender">
          <uni-data-checkbox
            v-model="fromData.gender"
            selectedColor="#16C2A3"
            :localdata="[
              { text: '男', value: 1 },
              { text: '女', value: 0 },
            ]"
          />
        </uni-forms-item>
        <uni-forms-item label="默认就诊人" name="isDefault">
          <view class="uni-switch">
            <switch
              v-model="fromData.isDefault"
              color="#20c6b2"
              style="transform: scale(0.7)"
            />
          </view>
        </uni-forms-item>
        <button class="uni-button">保存</button>
      </uni-forms>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './index.scss';
</style>
