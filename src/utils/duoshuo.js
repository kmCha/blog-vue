export default function () {
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
