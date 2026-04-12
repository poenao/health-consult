<script setup>
  // 读取页面视口的高度
  const { windowHeight } = uni.getSystemInfoSync()
  // 自定义组件属性
  const scrollPageProps = defineProps({
    // 可选的边框样式，默认为无边框
    borderStyle: {
      type: [String, Boolean],
      default: false,
    },
    // 下拉刷新
    refresherEnabled: {
      type: Boolean,
      default: false,
    },
    // 下拉刷新触发事件
    refresherTriggered: {
      type: Boolean,
      default: false,
    },
  })
  // 自定义事件
  defineEmits(['refresherrefresh', 'scrolltolower'])
</script>

<template>
  <!-- 适配iPhone X等刘海屏设备，增加顶部和底部安全区域的内边距 -->
  <scroll-view
    :style="{
      height: windowHeight + 'px',
      boxSizing: 'border-box',
      borderBottom: scrollPageProps.borderStyle,
    }"
    scroll-y
    :refresherEnabled="scrollPageProps.refresherEnabled"
    :refresherTriggered="scrollPageProps.refresherTriggered"
    @refresherrefresh="$emit('refresherrefresh', $event)"
    @scrolltolower="$emit('scrolltolower', $event)"
  >
    <view class="scroll-page-content">
      <slot></slot>
    </view>
  </scroll-view>
</template>

<style lang="scss">
  // 适配iPhone X等刘海屏设备，增加底部安全区域的内边距
  .scroll-page-content {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>
