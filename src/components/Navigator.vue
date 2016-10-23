<template>
  <transition name="fade">
    <div class="navigator">
      <div class="link-wrapper">
        <router-link :to="{ path: '/' }" exact>首页</router-link>
        <router-link :to="{ path: '/articles' }">文章</router-link>
        <router-link :to="{ path: '/categories' }">分类</router-link>
        <router-link :to="{ path: '/achieves' }">归档</router-link>
        <router-link :to="{ path: '/tags' }">标签</router-link>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    headerFixed () {
      return this.$store.state.headerFixed
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   window.addEventListener('scroll', e => {
    //     if (window.scrollTimer) {
    //       window.clearTimeout(window.scrollTimer)
    //     }
    //     window.scrollTimer = window.setTimeout(() => {
    //       let state = this.$store.state
    //       let top = document.body.scrollTop
    //       if (top < state.windowHeight - 50 && state.headerFixed) {
    //         this.$store.commit('unfixHeader')
    //       }
    //       if (top > state.windowHeight - 50 && !state.headerFixed) {
    //         this.$store.commit('fixHeader')
    //       }
    //     }, 80)
    //   }, false)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../variables/index.scss";

.navigator {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  .link-wrapper {
    overflow: hidden;
    a {
      display: inline-block;
      padding: 0.5rem 1.2rem;
      height: 30px;
      line-height: 30px;
      transition: 0.2s ease all;
      color: $navigator-color;
      text-decoration: none;
      &:hover, &.router-link-active {
        color: $primary-color;
      }
    }
  }
}
</style>
