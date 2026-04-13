<script setup></script>

<template>
  <view class="department-page">
    <scroll-view scroll-y class="department-primary">
      <view class="department-item active">内科</view>
      <view class="department-item">外科</view>
      <view class="department-item"></view>
    </scroll-view>
    <scroll-view class="department-secondary">
      <navigator
        hover-class="none"
        url="/subpkg_consult/description/index"
        class="department-item"
      >
        普通内科
      </navigator>
    </scroll-view>
  </view>
</template>

<style lang="scss">
  @import './index.scss';
</style>
