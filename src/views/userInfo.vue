<template>
  <div class="user">
    <div class="user-back">
      <img :src="userInfo.backgroundUrl" alt="" />
    </div>
    <div class="user-info">
      <div class="info">
        <img :src="userInfo.avatarUrl" alt="" />
        <div class="accont">
          <p class="name">昵称：{{ userInfo.nickname }}</p>
          <p class="musicId">音乐号：{{ userInfo.userId }}</p>
        </div>
      </div>
    </div>
    <div class="user-footer">
      <div class="item" @click="toMusicList">
        <div style="display: flex;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gedan"></use>
          </svg>
          <p class="text">歌单</p>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyou1"></use>
        </svg>
      </div>
      <div class="item">
        <div style="display: flex;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
          </svg>
          <p class="text">设置</p>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyou1"></use>
        </svg>
      </div>
      <div class="item">
        <div style="display: flex;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
          </svg>
          <p class="text">动态</p>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyou1"></use>
        </svg>
      </div>
      <div class="item">
        <div style="display: flex;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
          </svg>
          <p class="text">更多</p>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyou1"></use>
        </svg>
      </div>
      <div class="item">
        <div style="display: flex;">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-tuijian"></use>
          </svg>
          <p class="text">凑数</p>
        </div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyou1"></use>
        </svg>
      </div>
    </div>
    <van-button class="user-button" @click="toback"
        >退出登录</van-button
      >
  </div>
</template>

<script>
import { reactive, onBeforeMount, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/request/api/home'
export default {
  name: 'UserInfo',
  setup() {
    const state = reactive({
      id: '',
      userInfo: {}
    })
    const router = useRouter()
    state.id = localStorage.getItem('userId')
    onBeforeMount(async () => {
      let res = await getUserInfo(state.id)
      state.userInfo = res.data.profile
    })
    const toMusicList = () => {
      router.push('/')
    }
    const toback = () => {
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      router.push('/login')
    }
    const data = toRefs(state)
    return {
      ...data,
      toMusicList,
      toback
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  width: 100%;
  text-align: center;
  &-button {
    width: 90%;
    height: 48px;
    margin-top: 0.4rem;
    border-radius: 24px;
    background: linear-gradient(to right, #8cc4fd, rgba(0, 0, 255, 0.534));
    color: #fff;
    border: none;
  }
  .backLogin{
    margin-top: 20px;
    width: 60%;
    height: 48px;
  }
  &-back {
    position: absolute;
    width: 100%;
    height: 93%;
    z-index: -10;
    img {
      width: 100%;
      height: 100%;
      filter: blur(15px);
    }
  }
  &-info {
    padding: 32px;
    width: 100%;
    height: 2rem;
    .info {
      display: flex;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 10px;
      }
      .accont {
        margin-left: 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
          color: #fff;
        }
        .name {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  &-footer {
    width: 100%;
    margin-top: 2rem;
    .item {
      margin-top: 8px;
      border-bottom: 1px solid #333;
      padding: 0 20px;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #fff;
      justify-content: space-between;
      .icon {
        width: 30px;
        height: 30px;
        fill: #fff;
      }
      .text {
        margin-left: 8px;
      }
    }
  }
}
</style>