
function remSize() {
  // 获取设备的宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth > 750) {
    deviceWidth = 750;
  }
  deviceWidth = deviceWidth < 320 ? 320 : deviceWidth;

  // 1rem = 100px
  document.documentElement.style.fontSize = (deviceWidth/7.5) + 'px'
  // 设置字体大小 375px --> 0.3rem = 15px
  document.querySelector('body').style.fontSize = 0.3 + 'rem'

}
// 当窗口发生变化进行调用适配
window.onresize = function() {
  remSize()
}