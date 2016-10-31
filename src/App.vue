<template>
  <div id="app">
    <loader></loader>
    <navigator></navigator>
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Loader from './components/Loader.vue'
import store from './vuex/store'
import Navigator from './components/Navigator'

export default {
  data () {
    return {
      transitionName: 'fade'
    }
  },
  components: {
    Loader,
    Navigator
  },
  store: store,
  mounted () {
    // let defaultWidth = 1527
    // let defaultSize = 16
    // setFontSize()
    // window.addEventListener('resize', e => {
    //   setFontSize()
    // }, false)
    // // 根据窗口大小设置html字体大小，rem响应式
    // function setFontSize () {
    //   let windowWidth = window.innerWidth
    //   let size = windowWidth / defaultWidth * defaultSize
    //   document.documentElement.style.fontSize = size + 'px'
    // }

    // 设置全局window尺寸
    store.commit('setWindowSize', {
      height: window.innerHeight,
      width: window.innerWidth
    })

    // 获取articles、tags、categories
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
@import "./variables/index.scss";

html {
  font-size: 16px;
  font-family: "Arial","LiHei Pro Medium","Microsoft YaHei","黑体","宋体",sans-serif;
}
body {
  margin: 0;
  #app {
    color: $font-color;
    width: 100%;
  }
  .container {
    padding: 2.8rem 2rem;
    margin: 1rem auto;
    max-width: 1000px;
    box-sizing: border-box;

    @media screen and (max-width: 1000px) {
      max-width: 100%;
    }
  }
  a {
    color: $secondary-title-color;
    &:hover {
      color: $primary-color;
      text-decoration: none;
    }
  }
  p {
    text-align:justify;
  }
  ::selection {
    background: $primary-color;
    color: #fff;
  }
}
.fade-enter-active, .fade-leave {
  transition: all .3s ease;
  opacity: 1;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.slide-right-enter-active, .slide-right-leave {
  transition: all .5s ease;
  opacity: 1;
}
.slide-right-enter, .slide-right-leave-active {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-active, .slide-left-leave {
  transition: all .5s ease;
  opacity: 1;
}
.slide-left-enter, .slide-left-leave-active {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
