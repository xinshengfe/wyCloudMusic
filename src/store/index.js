import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/musicDetail'
import { loginInfo } from '@/request/api/home'

export default createStore({
  state: {
    playList: [{ // 播放列表
      al: {
        id: 34943039,
        name:"光泽",
        pic:3443670431612942,
        picUrl:"https://p1.music.126.net/D64eug6ElwN0IjdTY7EDFQ==/3443670431612942.jpg"
      },
      name: '空心',
      id: 435288399,
      ar: [{ name: '光泽' }]
    }],
    // 默认下标为0
    playListIndex: 0,
    isplay: true, // 暂停按钮的显示
    detailShow: false, // 歌曲详情页的显示
    lyric: {}, // 歌词
    currentTime: 0, // 当前播放时间
    duration: 0, // 歌曲总时长
    isLogin: false, // 判断是否登录
    footerShow: true, // 判断是否显示底部组件
  },
  getters: {
  },
  mutations: {
    updateIsplay(state, value) {
      state.isplay = value
    },
    updatePlayList(state, value) {
      state.playList = value
      // console.log(state.playList, '列表');
    },
    pushPlayList(state, value) {
      state.playList.push(value)
      // console.log(state.playList, 'pushshshshsh');
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyric(state, value) {
      state.lyric = value
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
    },
    updateDuration(state, value) {
      state.duration = value
    },
    updateIsLogin(state, value) {
      state.isLogin = value
    }
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      // console.log(res, '歌词接口');
      context.commit('updateLyric', res.data.lrc)
    },
    async getLogin(context, value) {
      let res = await loginInfo(value)
      return res
    }
  },
  modules: {
  }
})
