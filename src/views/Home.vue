<template>
  <div class="home">
    <topNav />
    <SwiperTop />
    <IconList />
    <MusicList />
  </div>
</template>

<script>
  import topNav from '@/components/home/TopNav.vue';
  import IconList from '@/components/home/IconList.vue';
  import MusicList from '@/components/home//MusicList.vue'
export default {
  name: 'HomeView',
  components: {
    topNav,
    IconList,
    MusicList
  }
}
</script>

<style lang="less">
</style>
