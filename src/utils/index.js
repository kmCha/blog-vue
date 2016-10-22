export function domReady (selector) {
  return new Promise((resolve, reject) => {
    const count = 0
    const check = () => {
      if (count > 200) return reject('超时')
      if (document.querySelector(selector)) {
        resolve()
      } else {
        window.setTimeout(() => {
          check()
        }, 50)
      }
    }
    check()
  })
}

export function insertDuoshuo () {
  // 多说评论框
  let dsScript = document.querySelector('.duoshuo-script')
  if (dsScript) {
    document.body.removeChild(dsScript)
    delete window.$ds
    delete window.DUOSHUO
  }
  let ds = document.createElement('script')
  ds.type = 'text/javascript'
  ds.async = true
  ds.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.unstable.js'
  ds.charset = 'UTF-8'
  ds.classList.add('duoshuo-script')
  document.body.appendChild(ds)
}

export function scrollBodyTo (top) {
  var frameId
  var diff = Number.MAX_SAFE_INTEGER
  scrollOneFrame()

  function scrollOneFrame () {
    var currTop = document.body.scrollTop
    var currDiff = currTop - top

    if (
      Math.floor(Math.abs(currDiff)) < 1 ||  // 每帧差值小于1
      currDiff === diff ||    // 死循环
      Math.abs(currDiff) > Math.abs(diff)   // 用户反向滚动
    ) {
      return window.cancelAnimationFrame(frameId)
    }

    document.body.scrollTop = currTop - currDiff / 10
    diff = currDiff
    frameId = window.requestAnimationFrame(scrollOneFrame)
  }
}
