<template>
  <div class="footer">
    <div class="footer-left" @click="updateDetailShow">
      <img class="img" :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="footer-left-name">
        <p style="margin-bottom: 4px; font-weight: 600">
          {{ playList[playListIndex].name }}
        </p>
        <span style="font-size: 0.28rem">横滑切换上下首哦</span>
      </div>
    </div>
    <div class="footer-right">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isplay">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-a-zanting1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-a-24gl-playlist2"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      :lazy-render="false"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <MusicDetail
        :musicInfo="playList[playListIndex]"
        @close="updateDetailShow"
        @play="play"
        :add-duraion="addDuraion"
      ></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import MusicDetail from './musicDetail.vue'
export default {
  components: {
    MusicDetail
  },
  data() {
    return {
      timer: 0
    }
  },
  mounted() {
    // console.log(this.$refs, this.detailShow, 'ref')
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    // this.updateTime()
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isplay', 'detailShow', 'duration'])
  },
  methods: {
    // 判断是否在播放
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsplay(false)
        this.updateTime()
      } else {
        this.$refs.audio.pause()
        this.updateIsplay(true)
        clearInterval(this.timer)
      }
    },
    updateTime() {
      this.timer = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 50)
    },
    addDuraion() {
      this.updateDuration(this.$refs.audio.duration)
    },  
    ...mapMutations(['updateIsplay', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuraion()
  },
  watch: {
    playListIndex() {
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.updateIsplay(false)
      }
    },
    playList() {
      if(this.isplay) {
        this.$refs.audio.autoplay = true
        this.updateIsplay(false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0.32rem;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  height: 1.4rem;
  &-left {
    flex: 4;
    display: flex;
    .img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    &-name {
      margin-left: 16px;
    }
  }
  &-right {
    flex: 1;
    display: flex;
    justify-content: space-around;
    .icon {
      fill: #000;
    }
  }
}
</style>