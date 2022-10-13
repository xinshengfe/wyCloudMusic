<template>
  <div class="music-list">
    <div class="top">
      <div class="title">发现好歌单</div>
      <van-button plain type="primary">更多</van-button>
    </div>
    <div class="music">
      <van-swipe
        :loop="false"
        :width="115"
        class="swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in state.musicList" :key="index">
          <router-link :to="{name:'ItemMusic',query:{id: item.id}}">
            <img :src="item.picUrl" />
            <div class="icon-count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-a-24gl-play"></use>
              </svg>
              <span> {{ changeCount(item.playCount) }}</span>
            </div>
            <span style="width: 2.1rem">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home'
import { onMounted, reactive } from 'vue'
export default {
  name: 'MusicList',
  setup() {
    let state = reactive({
      musicList: []
    })
    const changeCount = (play) => {
      if (play > 10000000) {
        return (play / 10000000).toFixed(1) + '亿'
      } else if (play > 10000) {
        return (play / 10000).toFixed(1) + '万'
      }
    }
    onMounted(async () => {
      let res = await getMusicList()
      state.musicList = res.data.result
    })
    return {
      state,
      changeCount
    }
  }
}
</script>

<style lang="less" scoped>
.music-list {
  width: 100%;
  height: 5rem;
  padding: 0.2rem 0;
  margin-top: 0.1rem;
  .top {
    padding: 0 0.2rem;
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 700;
    }

    /deep/.van-button {
      border: 1px solid #ccc;
      border-radius: 20px;
      height: 0.72rem;
    }
  }
  .music {
    width: 100%;
    height: 4rem;
    .swiper {
      position: relative;
      height: 100%;
      .icon-count {
        color: #fff;
        position: absolute;
        display: flex;
        align-items: center;
        top: 0.1rem;
        right: 20px;
        .icon {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
      /deep/.van-swipe__track {
        padding: 0.2rem;
      }
      .van-swipe-item {
        display: flex;
        flex-direction: column;
        height: 2rem;
        width: 2rem;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 0.2rem;
        }
      }
      .van-swipe-item:last-child {
        width: 2rem !important;
      }
    }
  }
}
</style>