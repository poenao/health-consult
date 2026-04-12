<template>
  <uni-forms
    class="login-form"
    ref="formRef"
    :model="formData"
    :rules="formRules"
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
    <uni-forms-item name="password">
      <uni-easyinput
        type="password"
        v-model="formData.password"
        placeholder="请输入密码"
        :input-border="false"
        placeholder-style="color: #C3C3C5"
      />
    </uni-forms-item>
    <view class="agreement">
      <radio :checked="isAgree" color="#16C2A3" @click="onAgreeClick" />
      我已同意
      <text class="link">用户协议</text>
      及
      <text class="link">隐私协议</text>
    </view>

    <button class="uni-button" @click="onSubmit">登 录</button>
    <navigator hover-class="none" class="uni-navigator" url=" ">
      忘记密码？
    </navigator>
  </uni-forms>
</template>

<script setup>
  import { ref } from 'vue'
  import { loginByPassword } from '../../../apis/user'
  import { userInfoStore } from '../../../stores/user'
  const sotre = userInfoStore()
  // 是否同意协议
  const isAgree = ref(false)
  // 获取表单组件
  const formRef = ref()
  // 表单数据
  const formData = ref({
    mobile: '13230000002',
    password: 'abc12345',
  })

  // 验证表单数据的规则
  const formRules = {
    mobile: {
      rules: [
        { required: true, errorMessage: '请填写手机号码' },
        -{ pattern: '^1\\d{10}$', errorMessage: '手机号码格式不正确' },
        +{ pattern: /^1\d{10}$/, errorMessage: '手机号码格式不正确' },
      ],
    },
    password: {
      rules: [
        { required: true, errorMessage: '请输入密码' },
        -{ pattern: '^[a-zA-Z0-9]{8}$', errorMessage: '密码格式不正确' },
        +{ pattern: /^[a-zA-Z0-9]{8}$/, errorMessage: '密码格式不正确' },
      ],
    },
  }
  // 是否同意协议
  function onAgreeClick() {
    isAgree.value = !isAgree.value
  }
  // 登录按钮点击事件
  const onSubmit = async () => {
    // 判断是否勾选协议
    if (!isAgree.value) return uni.utils.toast('请先同意协议!')
    try {
      formRef.value.validate()
      const res = await loginByPassword(formData.value)
      if (res.code !== 10000) return uni.utils.toast('登录失败!')
      sotre.token = res.data.token
      sotre.userInfo = res.data.userInfo
      // 跳转到之前的页面从pinia取出来
      const redirectUrl = sotre.redirectUrl
      const openType = sotre.openType
      uni[openType]({
        url: redirectUrl,
      })
      //提示登录成功
      uni.utils.toast('登录成功!')
    } catch (error) {
      console.log('表单验证失败:', error)
    }
  }
</script>

<style lang="scss">
  @import './styles.scss';
</style>
