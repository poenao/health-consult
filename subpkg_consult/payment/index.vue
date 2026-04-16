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
      <button class="uni-button">立即支付</button>
    </view>
  </scroll-page>
</template>
<script setup>
  import { ref } from 'vue'
  import { preOrderApi } from '../../apis/consult'
  import { useConsultStore } from '../../stores/consult'
  import { patientDetailApi } from '../../apis/patinet'
  const { type, illnessType, patientId, illnessInfo } = useConsultStore()

  // 预订单信息
  const preOrderInfo = ref({})
  // 就诊患者信息
  const patientDetail = ref({})
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
    console.log(res)
    // 渲染患者信息
    patientDetail.value = res.data
  }
  createPreOrder()
  createPatientDetail()
</script>

<style lang="scss">
  @import './index.scss';
</style>
