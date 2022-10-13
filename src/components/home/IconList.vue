<template>
  <div class="icon-list">
    <div class="top-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="top-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="top-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tupianzhibo"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="top-right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.icon-list {
  display: flex;
  justify-content: space-around;
  .top-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: .8rem;
      height: .8rem;
    }
    span {
      margin-top: .2rem;
      font-size: .3rem;
    }
  }
}
</style>