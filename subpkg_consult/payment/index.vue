<template>
  <scroll-page>
    <view class="payment-page">
      <uni-section
        title-font-size="32rpx"
        title-color="#121826"
        padding="30rpx"
        :title="`图文问诊 ${preOrderInfo.payment}元`"
      >
        <uni-list :border="false">
          <uni-list-item
            title="极速问诊"
            note="自动分配医生"
            thumb="/static/uploads/doctor-avatar.jpg"
            thumb-size="lg"
          />
          <uni-list-item
            title="优惠券"
            show-arrow
            :right-text="`-¥${preOrderInfo.couponDeduction}`"
          />
          <uni-list-item title="积分抵扣">
            <template #footer>
              <view class="uni-list-text-red">
                -¥{{ preOrderInfo.pointDeduction }}</view
              >
            </template>
          </uni-list-item>
          <uni-list-item title="实付款">
            <template #footer>
              <view class="uni-list-text-red">
                ¥{{ preOrderInfo.actualPayment }}</view
              >
            </template>
          </uni-list-item>
        </uni-list>
      </uni-section>

      <view class="dividing-line"></view>

      <uni-section
        title-font-size="32rpx"
        title-color="#121826"
        padding="30rpx"
        title="患者资料"
      >
        <uni-list :border="false">
          <uni-list-item title="患者信息">
            <template #footer>
              <view class="uni-list-text-gray">
                {{ patientDetail.name }} | {{ patientDetail.genderValue }} |
                {{ patientDetail.age }}岁
              </view>
            </template>
          </uni-list-item>
          <uni-list-item
            border
            title="病情描述"
            :note="illnessInfo.illnessDesc"
          />
        </uni-list>
      </uni-section>

      <!-- <view class="payment-agreement">
        <radio color="#20c6b2" value="1" />
        我已同意<text style="color: #20c6b2">支付协议</text>
      </view> -->
    </view>
    <!-- 下一步操作 -->
    <view class="next-step">
      <view class="total-amount">
        合计: <text class="number">¥{{ preOrderInfo.actualPayment }}</text>
      </view>
      <button class="uni-button" @click="onPaymentButtonClick">立即支付</button>
    </view>
    <!-- 支付组件 -->
    <custom-payment
      :order-id="orderId"
      ref="paymentRef"
      :amount="preOrderInfo.actualPayment"
      @confirm="onPaymentConfirm"
    />
  </scroll-page>
</template>
<script setup>
  import { ref } from 'vue'
  import { createOrderApi, preOrderApi } from '../../apis/consult'
  import { useConsultStore } from '../../stores/consult'
  import { patientDetailApi } from '../../apis/patinet'
  import { orderPayApi } from '../../apis/payment'
  import customPayment from '../../components/custom-payment/custom-payment.vue'
  const { type, illnessType, patientId, illnessInfo, depId } = useConsultStore()
  // 支付组件引用
  const paymentRef = ref()
  // 预订单信息
  const preOrderInfo = ref({})
  // 就诊患者信息
  const patientDetail = ref({})
  // 订单ID
  const orderId = ref('')
  // 生成预支付订单
  const createPreOrder = async () => {
    const res = await preOrderApi(type, {
      illnessType,
    })
    // 检测接口是否调用成功
    if (res.code !== 10000) return uni.utils.toast(message)
    // 渲染订单数据
    preOrderInfo.value = res.data
  }
  // 生成就诊患者信息
  const createPatientDetail = async () => {
    const res = await patientDetailApi(patientId)
    // 检测接口是否调用成功
    if (res.code !== 10000) return uni.utils.toast(message)
    // 渲染患者信息
    patientDetail.value = res.data
  }
  // 立即支付 会创建订单，获取订单id，打开支付组件
  const onPaymentButtonClick = async () => {
    if (orderId.value) return uni.utils.toast('订单不能重复创建')
    // 处理上传的图片，要求包含 ID 和 url （接口规订的）
    // 订单只能提交一次！！！
    illnessInfo.pictures = illnessInfo.pictures.map(({ url, uuid }) => {
      return { url, id: uuid }
    })
    // 生成订单会给一个订单id，后续支付需要这个订单id
    const res = await createOrderApi({
      type,
      illnessType,
      depId,
      patientId,
      ...illnessInfo,
    })
    // 接收订单id
    orderId.value = res.data.id
    // 将 Pinia 中缓存的数据清空掉（订单已创建完成）
    const consultStore = useConsultStore()
    // 病情描述
    consultStore.illnessInfo = consultStore.initalValue
    consultStore.type = ''
    consultStore.illnessType = ''
    consultStore.depId = ''
    consultStore.patientId = ''
    // 打开支付组件
    paymentRef.value.open()
  }
  const onPaymentConfirm = async ({ index }) => {
    if (index === 0) return uni.utils.toast('暂不支持微信支付!')
    // 调用后端提供的支付接口
    const { code, data, message } = await orderPayApi({
      orderId: orderId.value, // 订单ID
      paymentMethod: index, // 支付方式索引（0 微信支付，1 支付宝支付）
      payCallback: 'http://localhost:5173/#/subpkg_consult/room/index', // 支付完成后的回调地址（前端路由地址）
    })
    // 检测接口是否调用成功
    if (code !== 10000) return uni.utils.toast(message)
    // #ifdef H5
    // 引导用户支付（地址跳转方式）
    window.location.href = data.payUrl
    // #endif

    // #ifdef MP-WEIXIN
    // 引导用户支付（wx.requestPayment 小程序）
    wx.requestPayment({
      // 4 个参数
    })
    // #endif
  }

  createPreOrder()
  createPatientDetail()
</script>

<style lang="scss">
  @import './index.scss';
</style>
