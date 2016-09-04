<template>
  <div id="app">
    <navigator></navigator>
    <router-view></router-view>
  </div>
</template>

<script>
import Navigator from './components/Navigator'
import store from './store'

export default {
  components: {
    Navigator
  },
  replace: false,
  store: store,
  ready () {
    let defaultWidth = 1527
    let defaultSize = 16
    setFontSize()
    window.addEventListener('resize', e => {
      setFontSize()
    })
    // 根据窗口大小设置html字体大小，rem响应式
    function setFontSize () {
      let windowWidth = window.innerWidth
      let size = windowWidth / defaultWidth * defaultSize
      document.documentElement.style.fontSize = size + 'px'
    }
    // 设置全局window尺寸
    store.commit('setWindowSize', {
      height: window.innerHeight,
      width: window.innerWidth
    })
    if (!store.state.articles || !store.state.categories || !store.state.tags) {
      store.commit('startLoading')
      return Promise.all([
        store.dispatch('getArticles'),
        store.dispatch('getCategories'),
        store.dispatch('getTags')
      ]).then(() => {
        store.commit('finishLoading')
      }).catch(res => {
        console.log('提示网络问题')
      })
    }
  }
}
</script>

<style lang="scss">
$primary-color: #0dc7e3;
$secondary-color: #ef70bb;
$font-color: #444;
html {
  font-size: 16px;
  font-family: "Arial","LiHei Pro Medium","Microsoft YaHei","黑体","宋体",sans-serif;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  .container {
    padding: 2rem 20rem;
    @media (max-width: 1140px) {
      max-width: calc(1140px - 40rem);
      padding: 2rem 0;
      margin: 0 auto;
    }
  }
  #app {
    color: #444;
    width: 100%;
  }
  a {
    color: #0dc7e3;
    text-decoration: none;
  }
  p {
    text-align:justify;
  }
}

</style>
