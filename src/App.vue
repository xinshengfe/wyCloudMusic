<template>
  <router-view />
  <MusicFooter v-show="$store.state.footerShow" />
</template>

<script>
  import MusicFooter from './components/musicDetail/musicFooter.vue';
  export default {
    components: {
      MusicFooter
    }
  }
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
a {
  color: black;
  display: flex;
  flex-direction: column;
}
</style>
