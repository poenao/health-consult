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
    <custom-payment :order-id="orderId" ref="paymentRef" :amount="preOrderInfo.actualPayment" />
  </scroll-page>
</template>
<script setup>
  import { ref } from 'vue'
  import { createOrderApi, preOrderApi } from '../../apis/consult'
  import { useConsultStore } from '../../stores/consult'
  import { patientDetailApi } from '../../apis/patinet'
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
  // 立即支付
  const onPaymentButtonClick = async () => {
    if (orderId.value) return uni.utils.toast('订单不能重复创建')
    // 处理上传的图片，要求包含 ID 和 url （接口规订的）
    // 订单只能提交一次！！！
    illnessInfo.pictures = illnessInfo.pictures.map(({ url, uuid }) => {
      return { url, id: uuid }
    })
    // 生成订单
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
  createPreOrder()
  createPatientDetail()
</script>

<style lang="scss">
  @import './index.scss';
</style>
async async
