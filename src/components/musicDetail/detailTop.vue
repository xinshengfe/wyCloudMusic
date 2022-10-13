<template>
  <div class="detail">
    <img :src="state.creator.backgroundUrl" alt="" class="bgimg" />
    <div class="detail-top">
      <div class="top1">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-a-312zhixiangzuo"></use>
        </svg>
        <span class="top-title">歌单</span>
      </div>
      <div class="top2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mulu-lujing"></use>
        </svg>
      </div>
    </div>
    <div class="detail-middle">
      <div class="img-box">
        <img :src="state.playList.coverImgUrl" alt="" />
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-24gl-play"></use>
          </svg>
          <span>{{ changeCount(state.playList.playCount) }}</span>
        </div>
      </div>
      <div class="content">
        <span class="name">{{ state.playList.name }}</span>
        <div style="display: flex; align-items: center; margin: 10px 0 3px 0">
          <img :src="state.creator.avatarUrl" alt="" />
          <span style="margin-left: 16px; color: #ccc">{{
            state.creator.nickname
          }}</span>
        </div>
        <span class="description">{{ state.playList.description }}</span>
      </div>
    </div>
    <div class="detail-footer">
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiaoxi"></use>
        </svg>
        <span>{{ state.playList.commentCount }}</span>
      </div>
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{ state.playList.shareCount }}</span>
      </div>
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai"></use>
        </svg>
        <span>下 载</span>
      </div>
      <div class="icon-box">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-a-duoxuan-xuanzhongzhengque"></use>
        </svg>
        <span>全 选</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusciDetail } from '@/request/api/musicDetail.js'
import { onBeforeMount, reactive } from 'vue'

export default {
  props: ['id'],
  setup(props) {
    const id = props.id
    const state = reactive({
      playList: {},
      creator: {}
    })
    const changeCount = (play) => {
      if (play > 10000000) {
        return (play / 10000000).toFixed(1) + '亿'
      } else if (play > 10000) {
        return (play / 10000).toFixed(1) + '万'
      }
    }
    onBeforeMount(async () => {
      let res = await getMusciDetail(id)
      // console.log(res)
      state.playList = res.data.playlist
      state.creator = res.data.playlist.creator
    })
    return {
      state,
      changeCount
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  height: 6rem;
  position: relative;
  .bgimg {
    z-index: -1;
    width: 100%;
    height: 6rem;
    position: fixed;
    filter: blur(10px);
  }
  &-top {
    padding: 10px 0.32rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      fill: #fff;
    }
    .top1 {
      flex: 4;
      display: flex;
      align-items: center;
      .top-title {
        font-size: 0.36rem;
        margin-left: 10px;
        color: #fff;
        font-weight: 700;
      }
    }
    .top2 {
      display: flex;
      flex: 1;
      justify-content: space-between;
    }
  }
  &-middle {
    display: flex;
    padding: 10px 16px;
    margin-top: 16px;
    .img-box {
      position: relative;
      img {
        flex: 1;
        width: 2rem;
        height: 2.4rem;
        border-radius: 4px;
      }
      .icon-box {
        position: absolute;
        top: 2.5px;
        right: 0.1rem;
        display: flex;
        align-items: center;
        .icon {
          width: 16px;
          height: 16px;
        }
        span {
          color: white;
        }
      }
    }
    .content {
      flex: 2.5;
      margin-left: 16px;
      .name {
        color: #fff;
        font-weight: 600;
      }
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
      }
      .description {
        display: block;
        color: #ccc;
        font-size: 14px;
        margin-top: 3px;
        max-height: 1.56rem;
        overflow: hidden;
      }
    }
  }
  &-footer {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
    .icon-box {
      display: flex;
      flex-direction: column;
      text-align: center;
      .icon {
        fill: #fff;
        margin: 0 0 5px 5px;
      }
      span {
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>