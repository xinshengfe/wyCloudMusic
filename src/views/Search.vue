<template>
  <div class="box">
    <div class="search">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-fanhuijian"></use>
      </svg>
      <input
        type="text"
        placeholder="林俊杰"
        v-model="searchValue"
        @keydown.enter="search"
      />
    </div>
    <div class="history">
      <div class="search-history">
        <span class="tag">搜索历史</span>
        <svg class="icon" aria-hidden="true" @click="cleanHistory">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
      <div class="history-content">
        <span
          class="search-tag"
          v-for="item in keyWordList"
          :key="item"
          @click="clickSearch(item)"
          >{{ item }}</span
        >
      </div>
      <p v-if="keyWordList.length == 0" style="text-align: center">
        暂无搜索历史
      </p>
    </div>
    <!-- <div class="search-list">
      <p v-for="(item, i) in searchList" :key="i">{{ item.name }}</p>
    </div> -->
    <div
      class="list-music"
      v-for="(item, index) in searchList"
      :key="index"
    >
      <div class="list-music-info" @click="updateIndex(item)">
        <span class="num">{{ index + 1 }}</span>
        <div class="music-info">
          <span class="music">{{ item.name }}</span>
          <div style="max-height: 18px; overflow: hidden">
            <span class="author" v-for="(x, i) in item.artists" :key="i">
              {{ x.name }}&nbsp;
            </span>
          </div>
        </div>
      </div>
      <div class="list-music-icon">
        <svg class="icon icon-mg" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-a-bofang1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mulu-lujing"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { searchMusic } from '@/request/api/home.js'
import { useStore } from 'vuex'

export default {
  name: 'Search',
  setup() {
    const data = reactive({
      keyWordList: [],
      searchValue: '',
      searchList: []
    })
    const $store = useStore()
    const methods = {
      async search() {
        if (data.searchValue.trim() === '') {
          return
        } else {
          data.keyWordList.unshift(data.searchValue)
          // 去重
          data.keyWordList = [...new Set(data.keyWordList)]
          // 长度限制
          if (data.keyWordList.length > 8) {
            data.keyWordList.splice(7, 1)
          }
          localStorage.setItem('KEY_WORDLIST', JSON.stringify(data.keyWordList))
          let res = await searchMusic(data.searchValue)
          data.searchList = res.data.result.songs
          // console.log(data.searchList)
          data.searchValue = ''
        }
      },
      cleanHistory() {
        data.keyWordList.length = 0
        localStorage.removeItem('KEY_WORDLIST')
      },
      async clickSearch(val) {
        let res = await searchMusic(val)
        // console.log(res, '搜索结果')
        data.searchList = res.data.result.songs
        // console.log(data.searchList)
      },
      updateIndex(item) {
        item.al = item.album
        item.al.picUrl = item.album.artist.img1v1Url
        item.ar = item.artists
        $store.commit('pushPlayList', item)
        $store.commit('updatePlayListIndex', $store.state.playList.length - 1)
      },
    }
    onMounted(() => {
      data.keyWordList = JSON.parse(localStorage.getItem('KEY_WORDLIST')) || []
    })
    const state = toRefs(data)
    return {
      ...state,
      ...methods
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  .search {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 16px;
    input {
      margin-left: 0.32rem;
      outline: none;
      border: none;
      border-bottom: 1px solid #ccc;
      height: 0.72rem;
      line-height: 0.72rem;
      width: 80%;
      padding: 0 0 0 0.2rem;
    }
  }
  .history {
    .search-tag {
      padding: 8px 12px;
      background: rgb(224, 213, 213);
      border-radius: 0.36rem;
      margin: 5px 10px;
    }
    .search-history {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0.2rem 0.4rem;
      .tag {
        font-size: 0.36rem;
        font-weight: bold;
      }
    }
    &-content {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .list-music {
    margin-top: 0.4rem;
    display: flex;
    align-items: center;
    padding: 0 .32rem;
    &-info {
      display: flex;
      align-items: center;
      flex: 4;
      .num {
        flex: 1;
        color: #333;
        font-weight: bold;
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