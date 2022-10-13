import { Swipe, SwipeItem, Button } from 'vant';
// 将引入的组件放入一个数组中
let ui = [
  Swipe, SwipeItem, Button
]

export default function getVant(app) {
  ui.forEach(item => {
    return app.use(item)
  })
}