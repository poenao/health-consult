<template>
  <view class="room-page">
    <scroll-view
      refresher-enabled
      refresher-background="#f2f2f2"
      scroll-y
      style="flex: 1; overflow: hidden"
    >
      <view class="message-container">
        <!-- 此处将来填充更多代码... -->
      </view>
    </scroll-view>

    <!-- 发送消息 -->
    <view class="message-bar">
      <template v-if="true">
        <uni-easyinput
          disabled
          :clearable="false"
          :input-border="false"
          placeholder-style="font-size: 32rpx; color: #c3c3c5;"
          placeholder="问医生"
        />
        <view class="image-button">
          <uni-icons size="40" color="#979797" type="image"></uni-icons>
        </view>
      </template>
      <button v-else class="uni-button">咨询其它医生</button>
    </view>
  </view>
</template>
<script setup>
  import { io } from 'socket.io-client'
  import { userInfoStore } from '../../stores/user'
  import { ref, onUnmounted } from 'vue'
  import { onLoad } from '@dcloudio/uni-app'

  const { token } = userInfoStore()
  const messageList = ref([])
  let socket = null

  onLoad((query) => {
    const orderId = query.orderId
    console.log('收到 orderId:', orderId)
    if (!orderId) {
      uni.utils.toast('缺少订单ID')
      return
    }
    socket = io('https://consult-api.itheima.net', {
      auth: { token: 'Bearer ' + token },
      query: { orderId },
      transports: ['websocket', 'polling'],
      timeout: 5000,
    })
    socket.on('connect', () => {
      console.log('socket 已连接', socket.id)
    })
    socket.on('connect_error', (err) => {
      console.log('socket 连接失败', err.message)
    })
    socket.on('chatMsgList', (res) => {
      console.log('chatMsgList 收到数据', res)
      if (res.code !== 10000) return
      res.data.forEach(({ items }) => {
        messageList.value.push(...items)
      })
    })
  })

  onUnmounted(() => {
    if (socket) {
      socket.disconnect()
      socket = null
    }
  })
</script>
<style lang="scss">
  @import './index.scss';
</style>
