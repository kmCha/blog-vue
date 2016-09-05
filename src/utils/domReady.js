export default function (selector) {
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
