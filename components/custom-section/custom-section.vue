<script setup>
  // 组件属性定义
  const sectionProps = defineProps({
    // 标题文本
    title: {
      type: String,
      default: '',
    },
    // 是否显示右侧箭头图标，默认为 false
    showArrow: {
      type: Boolean,
      default: false,
    },
    // 自定义样式
    customStyle: {
      type: Object,
      default: {},
    },
  })
</script>

<template>
  <!-- 自定义内容区域 -->
  <view class="custom-section" :style="{ ...sectionProps.customStyle }">
    <view class="custom-section-header">
      <!-- 自定义标题区域 -->
      <view class="section-header-title">{{ sectionProps.title }}</view>
      <view class="section-header-right">
        <slot name="right" />
        <uni-icons
          v-if="sectionProps.showArrow"
          color="#c3c3c5"
          size="16"
          type="forward"
        />
      </view>
    </view>
    <slot />
  </view>
</template>

<style lang="scss">
  .custom-section {
    padding: 40rpx 30rpx 30rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
  }

  .custom-section-header {
    display: flex;
    justify-content: space-between;
    line-height: 1;
    margin-bottom: 20rpx;
  }

  .section-header-title {
    font-size: 32rpx;
    color: #333;
  }

  .section-header-right {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #c3c3c5;
  }
</style>
