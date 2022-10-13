<template>
  <div class="top-nav">
    <div class="top-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mulu-lujing"></use>
      </svg>
    </div>
    <div class="top-content">
      <span @click="$router.push('/userinfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="top-right" @click="$router.push('/search')">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.top-nav {
  width: 100%;
  height: 1rem;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .top-content {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 0.36rem;
    align-items: center;
  }
  .active {
    font-weight: 900;
  }
}
</style>