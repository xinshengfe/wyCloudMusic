<template>
  <div class="login">
    <div class="login-img">
      <h1>欢迎使用</h1>
      <img src="@/assets/wyylogo.png" class="img" alt="" />
      <h1>网抑云音乐</h1>
    </div>
    <van-form @submit="onSubmit">
      <div class="login-input">
        <van-cell-group inset>
          <van-field
            v-model="phone"
            label="电话"
            placeholder="请输入电话号码"
            left-icon="smile-o"
            :rules="[{ required: true, message: '请输入电话号码' }]"
          />
        </van-cell-group>
        <van-cell-group inset>
          <van-field
            v-model="password"
            label="密码"
            type="password"
            placeholder="请输入密码"
            left-icon="music-o"
            :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>
      </div>
      <van-button
        class="login-button"
        plain
        native-type="submit"
        @click="isLogin"
        >登录</van-button
      >
      <van-button class="login-button back" plain @click="toback"
        >取消</van-button
      >
    </van-form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  setup() {
    const data = reactive({
      phone: '',
      password: ''
    })
    const router = useRouter()
    const store = useStore()
    const methods = {
      submit(values) {
        // console.log('submit', values)
      },
      async isLogin() {
        let result = await store.dispatch('getLogin', {
          phone: data.phone,
          password: data.password
        })
        if (result.data.code === 200) {
          const token = result.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('userId', result.data.account.id)
          store.commit('updateIsLogin', true)
          router.push('/userinfo')
          // console.log(result, '登录信息')
        } else {
          alert('登录失败,请检查账号密码或网络问题')
        }
      },
      toback() {
        router.push('/')
      }
    }
    const state = toRefs(data)
    return {
      ...state,
      ...methods
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  text-align: center;
  position: fixed;
  padding: 20px 0 0 0;
  height: 100%;
  width: 100%;
  z-index: 999;
  background: #fff;
  &-img {
    .img {
      width: 100%;
      height: 100%;
    }
  }
  &-input {
    .van-cell-group {
      margin-top: 20px;
    }
  }
  &-button {
    width: 90%;
    height: 48px;
    margin-top: 0.4rem;
    border-radius: 24px;
    background: linear-gradient(to right, #8cc4fd, rgba(0, 0, 255, 0.534));
    color: #fff;
    border: none;
  }
  .back {
    background: transparent;
    color: #1989fa;
    border: 1px solid #1989fa;
  }
}
</style>