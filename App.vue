<script>
  export default {
    onLaunch: function () {
      console.log('App Launch')
    },
    onShow: function () {
      console.log('App Show')
    },
    onHide: function () {
      console.log('App Hide')
    },
  }
</script>

<style lang="scss">
  // 单色图标
  @import './static/fonts/iconfont.scss';
  // 多色图标
    @import './color-fonts.scss';
  /*每个页面公共css */

  // 图片
  image {
    vertical-align: middle; // 解决图片下方出现空白的问题
  }
  // 按钮
  button::after {
    display: none; // 解决微信小程序button组件点击后出现的水波纹效果
  }

  // 统一按钮样式
  .uni-button {
    height: 88rpx; // 按钮高度
    text-align: center; // 按钮文本居中
    line-height: 88rpx; // 按钮文本垂直居中
    border-radius: 88rpx; // 圆角
    color: #fff; // 按钮文本颜色
    font-size: 32rpx; // 按钮文本大小
    background-color: #20c6b2; // 按钮背景颜色

    &[disabled],  // 禁用状态样式
    &.disabled {
      // 禁用状态样式
      color: #fff !important; // 禁用状态文本颜色
      background-color: #ace8e0 !important; // 禁用状态背景颜色
    }
  }
</style>
