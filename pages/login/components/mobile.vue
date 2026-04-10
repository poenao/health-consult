<template>
  <uni-forms class="login-form" ref="form">
    <uni-forms-item name="name">
      <uni-easyinput
        :input-border="false"
        :clearable="false"
        placeholder="请输入手机号"
        placeholder-style="color: #C3C3C5"
      />
    </uni-forms-item>
    <uni-forms-item name="name">
      <uni-easyinput
        :input-border="false"
        :clearable="false"
        placeholder="请输入验证码"
        placeholder-style="color: #C3C3C5"
      />
      <view class="text-button" v-if="showCountDown">
        <custom-countdown
          :show-hour="false"
          :show-minute="false"
          :second="10"
          :show-day="false"
          color="#16C2A3"
          @timeup="onCountdownTimeup"
        />秒后重新获取
      </view>
      <text v-else class="text-button" @click="getVerificationCode">{{
        buttonText
      }}</text>
    </uni-forms-item>

    <view class="agreement">
      <radio :checked="false" color="#16C2A3" />
      我已同意
      <text class="link">用户协议</text>
      及
      <text class="link">隐私协议</text>
    </view>

    <button class="uni-button">登 录</button>
  </uni-forms>
</template>

<script setup>
  import { ref } from 'vue'
  import CustomCountdown from '../../../components/custom-countdown/custom-countdown.vue'
  // 是否显示倒时计组件
  const showCountDown = ref(false)
  //按钮文件
  const buttonText = ref('获取验证码')
  // 获取验证码按钮点击事件
  const getVerificationCode = () => {
    // 这里可以添加获取验证码的逻辑，例如发送请求到服务器获取验证码
    showCountDown.value = true
  }
  // 倒计时结束事件
  const onCountdownTimeup = () => {
    showCountDown.value = false
    buttonText.value = '重新获取验证码'
  }
</script>

<style lang="scss">
  @import './styles.scss';
</style>
