<template>
  <uni-forms
    :model="formData"
    ref="formRef"
    :rules="formRules"
    class="login-form"
  >
    <uni-forms-item name="mobile">
      <uni-easyinput
        v-model="formData.mobile"
        :input-border="false"
        :clearable="false"
        placeholder="请输入手机号"
        placeholder-style="color: #C3C3C5"
      />
    </uni-forms-item>
    <uni-forms-item name="code">
      <uni-easyinput
        v-model="formData.code"
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

    <button class="uni-button" @click="login">登 录</button>
  </uni-forms>
</template>

<script setup>
  import { ref } from 'vue'
  import CustomCountdown from '../../../components/custom-countdown/custom-countdown.vue'
  import { verifyCodeApi } from '../../../apis/user'
  // 表单数据
  const formData = ref({
    mobile: '13230000002',
    code: '',
  })
  // 是否显示倒时计组件
  const showCountDown = ref(false)
  // 是否同意协议
  const isAgree = ref(false)
  //按钮文件
  const buttonText = ref('获取验证码')
  // 获取验证码按钮点击事件
  const getVerificationCode = async () => {
    // 发送验证码请求
    const { code, data, message } = await verifyCodeApi({
      mobile: formData.value.mobile,
      type: 'login',
    })
    formData.value.code = data.code // 模拟将验证码直接返回并填充到输入框中，实际应用中应根据后端接口调整
    uni.utils.toast('验证码已发送，请查收!')
    // 检测接口是否调用成功
    if (code !== 10000) return uni.utils.toast(message)
    showCountDown.value = true
  }
  // 倒计时结束事件
  const onCountdownTimeup = () => {
    showCountDown.value = false
    buttonText.value = '重新获取验证码'
  }
  // 表单实例对象
  const formRef = ref(null)
  // 表单验证规则
  const formRules = {
    mobile: {
      rules: [
        { required: true, errorMessage: '请填写手机号码' },
        { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
      ],
    },
    code: {
      rules: [
        { required: true, errorMessage: '请输入验证码' },
        { len: 6, errorMessage: '验证码应为6位' },
      ],
    },
  }
  // 登录按钮点击事件
  const login = () => {
    try {
      const formData = formRef.value.validate()
      console.log('表单验证成功:', formData)
    } catch (error) {
      console.log('表单验证失败:', error)
    }
  }
</script>

<style lang="scss">
  @import './styles.scss';
</style>
