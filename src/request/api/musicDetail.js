import service from "..";
// 获取详情
export function getMusciDetail(id) {
  return service({
    method: 'get',
    url: `/playlist/detail?id=${id}`
  })
}

// 获取歌单所有歌曲
export function getMusicPlaylist(id) {
  return service({
    method: 'get',
    url: `/playlist/track/all?id=${id}&limit=10`
  })
}

// 获取歌词
export function getMusicLyric(id) {
  return service({
    method: 'get',
    url: `/lyric?id=${id}`
  })
}

