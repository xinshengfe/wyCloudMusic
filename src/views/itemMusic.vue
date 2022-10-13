<template>
  <div>
    <MusicDetailTop :id="id" />
    <MusicPlayList :id="id" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import MusicDetailTop from '@/components/musicDetail/detailTop.vue'
import MusicPlayList from '@/components/musicDetail/musicPlayList.vue'
export default {
  name: 'ItemMusic',
  components: {
    MusicDetailTop,
    MusicPlayList
  },
  setup() {
    const route = useRoute()
    // 跳转传过来的id
    const id = route.query.id
    return {
      id
    }
  }
}
</script>

<style>
</style>