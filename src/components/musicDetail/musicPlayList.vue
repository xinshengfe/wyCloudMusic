<template>
  <div class="list">
    <div class="list-top">
      <div style="display: flex; align-items: center">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span class="play-all"
          >播放全部 <span> (共{{ state.musicList.length }}首)</span></span
        >
      </div>
      <van-button type="danger">+ 收藏{{}}</van-button>
    </div>
    <div
      class="list-music"
      v-for="(item, index) in state.musicList"
      :key="index"
    >
      <div class="list-music-info">
        <span class="num">{{ index + 1 }}</span>
        <div class="music-info" @click="playMusic(index)">
          <span class="music">{{ item.name }}</span>
          <div style="max-height: 18px; overflow: hidden">
            <span class="author" v-for="(x, i) in item.ar" :key="i">
              {{ x.name }}&nbsp;
            </span>
          </div>
        </div>
      </div>
      <div class="list-music-icon">
        <svg class="icon icon-mg" aria-hidden="true" v-if="item.mv">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mulu-lujing"></use>
        </svg>
      </div>
    </div>
    <div style="min-height: 1.4rem"></div>
  </div>
</template>

<script>
import { getMusicPlaylist } from '@/request/api/musicDetail.js'
import { onBeforeMount, reactive } from 'vue'
import { mapMutations } from 'vuex'
export default {
  props: ['id'],
  setup(props) {
    const state = reactive({
      musicList: []
    })
    const methods = {
      playMusic(index) {
        this.updatePlayList(state.musicList)
        this.updatePlayListIndex(index)
      },
      ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
    }
    onBeforeMount(async () => {
      let res = await getMusicPlaylist(props.id)
      state.musicList = res.data.songs
      // console.log(state.musicList, '播放列表')
    })
    return {
      state,
      ...methods
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  background-color: #fff;
  padding: 0.2rem 0.2rem;
  border-radius: 0.5rem;
  margin-top: 0.1rem;
  position: absolute;
  overflow: auto;
  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      .play-all {
        margin: 0 0.32rem;
        font-weight: 700;
        span {
          font-size: 0.24rem;
          font-weight: normal;
          color: #ccc;
        }
      }
    }
    button {
      min-width: 1.44rem;
      height: 0.64rem;
      border-radius: 0.4rem;
    }
  }
  &-music {
    margin-top: 0.4rem;
    display: flex;
    align-items: center;
    &-info {
      display: flex;
      align-items: center;
      flex: 4;
      .num {
        flex: 1;
        color: #333;
      }
      .music-info {
        flex: 11;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .music {
          font-weight: 700;
          font-size: 0.3rem;
          max-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .author {
          color: #aaa;
          font-size: 0.28rem;
        }
      }
    }
    &-icon {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      .icon {
        fill: #ccc;
        &-mg {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>