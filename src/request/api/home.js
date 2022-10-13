import service from "../index";
// 获取首页轮播图的数据
export function getBanner() {
  return service({
    method: 'get',
    url: '/banner?type=2'
  })
}
// 首页音乐列表
export function getMusicList() {
  return service({
    method: 'get',
    url: '/personalized?limit=10'
  })
}
// 搜索/search?keywords=海阔天空
export function searchMusic(data) {
  return service({
    method: 'get',
    url: `/search?keywords=${data}`
  })
}

// /login/cellphone?phone=xxx&password=yyy
// /login?email=xxx@163.com&password=yyy

export function loginInfo(data) {
  return service({
    method: 'get',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}

// 获取用户详情
export function getUserInfo(id) {
  return service({
    method: 'get',
    url: `/user/detail?uid=${id}`
  })
}
