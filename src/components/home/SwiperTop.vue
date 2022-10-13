<template>
  <div>
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="(item, index) in data.images" :key="index">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { getBanner } from '@/request/api/home'
export default {
  setup() {
    const data = reactive({
      images: []
    })
    onMounted(async () => {
      // axios.get('http://localhost:3000/banner?type=2').then((res) => {
      //   data.images = res.data.banners
      //   console.log(data)
      // })
      let res = await getBanner()
      data.images = res.data.banners
    })
    return { data }
  }
}
</script>

<style lang="less">
.van-swipe {
  width: 375px;
  padding: 10px 0;
  .van-swipe__track {
    .van-swipe-item {
      img {
        width: 375px;
        height: 3rem;
      }
    }
  }
  .van-swipe__indicators {
    bottom: .3rem;
    i {
      background: #00f;
    }
  }
}
</style>