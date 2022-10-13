<template>
  <div class="detail">
    <img :src="musicInfo.al.picUrl" class="background" alt="" />
    <div class="detail-top">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="closeDetail">
          <use xlink:href="#icon-a-312zhixiangzuo"></use>
        </svg>
        <div class="music-info">
          <Vue3Marquee>
            {{ musicInfo.name }}
          </Vue3Marquee>
          <div style="display: flex; align-items: center; color: #999">
            <span v-for="(item, index) in musicInfo.ar" :key="index">{{
              item.name
            }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangyou1"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detail-mid" @click="getLyric" v-show="!showLyric">
      <img
        src="@/assets/zhizhen.png"
        alt=""
        class="cz"
        :class="{ cz_active: !isplay }"
      />
      <img src="@/assets/cdd.png" alt="" class="cd" />
      <img
        :class="[isplay ? 'cd_pause' : 'cd_running']"
        :src="musicInfo.al.picUrl"
        @click="showLyric = true"
        class="back-img"
      />
    </div>
    <div class="detail-lyric" ref="lyricBox" v-show="showLyric">
      <p
        class="lyric"
        v-for="(item, index) in lyricList"
        :key="index"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 <= item.pre
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <div class="detail-footer">
      <div class="top" style="display: flex; justify-content: space-around">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo"></use>
        </svg>
      </div>
      <div class="mid">
        <input
          type="range"
          class="progress"
          min="0"
          :max="duration"
          v-model="currentTime"
        />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shunxubofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="switchSong(-1)">
          <use xlink:href="#icon-a-shangyishou1"></use>
        </svg>
        <svg
          class="icon"
          v-if="isplay"
          aria-hidden="true"
          style="width: 40px; height: 40px"
          @click="play"
        >
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg
          class="icon"
          v-else
          aria-hidden="true"
          style="width: 40px; height: 40px"
          @click="play"
        >
          <use xlink:href="#icon-a-zanting1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="switchSong(1)">
          <use xlink:href="#icon-xiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanhuan"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapState, mapMutations } from 'vuex'
import { getMusicLyric } from '@/request/api/musicDetail'
export default {
  props: ['musicInfo', 'addDuraion'],
  data() {
    return {
      showLyric: false
    }
  },
  components: {
    Vue3Marquee
  },
  computed: {
    ...mapState([
      'isplay',
      'lyric',
      'currentTime',
      'playListIndex',
      'playList',
      'duration'
    ]),
    lyricList() {
      let lyricArr
      if (this.lyric.lyric) {
        lyricArr = this.lyric.lyric.split(/[(\r\n)\r\n]+/).map((item) => {
          let min = item.slice(1, 3)
          let sec = item.slice(4, 6)
          let mill = item.slice(7, 10)
          let lrc = item.slice(11, item.length)
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lrc = item.slice(10, item.length)
          }
          let time = Number(min) * 60 * 1000 + Number(sec) * 1000 + Number(mill)
          return { min, sec, mill, lrc, time }
        })
        lyricArr.forEach((item, i) => {
          if (i == lyricArr.length - 1 || isNaN(lyricArr[i + 1].time)) {
            item.pre = 100000
          } else {
            item.pre = lyricArr[i + 1].time
          }
        })
      }
      return lyricArr
    }
  },
  data() {
    return {
      musicName: this.musicInfo.name,
      musicAuthor: this.musicInfo.ar,
      imgSrc: this.musicInfo.al.picUrl,
      id: this.musicInfo.id,
      control: true
    }
  },
  watch: {
    currentTime(newVal) {
      let p = document.querySelector('p.active')
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.lyricBox.scrollTop = p.offsetTop - 300
        }
      }
      if (newVal >= this.duration) {
        this.switchSong(1)
        this.play()
      }
      if (newVal == 0) {
        this.$refs.lyricBox.scrollTop = 0
      }
    }
  },
  mounted() {
    // console.log(this.musicInfo, '音乐详情')
    this.addDuraion()
  },
  methods: {
    closeDetail() {
      this.showLyric = false
      this.$emit('close')
    },
    play() {
      this.$emit('play')
    },
    async getLyric() {
      this.lyric = await getMusicLyric(this.id)
    },
    switchSong(val) {
      if (this.control) {
        this.control = false
        let index = this.playListIndex + val
        if (index == -1) {
          index = this.playList.length - 1
        } else if (index == this.playList.length) {
          index = 0
        }
        // console.log(this.playList.length, index)
        this.updatePlayListIndex(index)
        setTimeout(() => {
          this.control = true
        }, 1000)
      }
    },
    ...mapMutations(['updatePlayListIndex'])
  }
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  height: 100%;
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(30px);
  }
  .icon {
    fill: #fff;
  }
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    .left {
      display: flex;
      align-items: center;
      .music-info {
        margin-left: 0.2rem;
        .vue3-marquee {
          width: 3rem;
          color: #fff;
        }
        .icon {
          width: 0.3rem;
          fill: #999;
        }
      }
    }
  }
  &-mid {
    width: 100%;
    height: 10rem;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    .cz {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      top: 1rem;
      transform-origin: 0 0;
      transform: rotate(-14deg);
      transition: all 2s;
    }
    .cz_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      top: 1rem;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }
    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
    .back-img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_ar 10s linear infinite;
    }
    .cd_active {
      animation-play-state: running;
    }
    .cd_pause {
      animation-play-state: paused;
    }
  }
  &-lyric {
    height: 10rem;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    overflow: scroll;
    scroll-behavior: smooth;
    .lyric {
      text-align: center;
      color: #ccc;
      margin-bottom: 0.4rem;
    }
    .active {
      color: #fff;
      font-size: 0.5rem;
    }
  }
  &-footer {
    position: absolute;
    width: 100%;
    bottom: 0.8rem;
    .mid {
      margin: 0.2rem 0;
      .progress {
        width: 100%;
      }
    }
    .footer {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
