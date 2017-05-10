<template>
  <div class="img-header" :style="style">
    <div class="link-wrapper">
      <router-link :to="{ path: '/articles' }">文章</router-link>
      <router-link :to="{ path: '/categories' }">分类</router-link>
      <router-link :to="{ path: '/achieves' }">归档</router-link>
      <router-link :to="{ path: '/tags' }">标签</router-link>
    </div>
  </div>
</template>

<script>
import Navigator from './Navigator.vue'
import particle from '../utils/three-particle.js'

export default {
  data () {
    return {

    }
  },
  computed: {
    width () {
      return this.$store.state.windowWidth
    },
    height () {
      return this.$store.state.windowHeight
    },
    style () {
      return 'height: ' + this.$store.state.windowHeight + ';'
    },
    partimationDone () {
      return this.$store.state.partimationAnimationDone
    }
  },
  components: {
    Navigator
  },
  methods: {
  },
  mounted () {
    if (this.$store.state.partimation) {
      document.querySelector('.img-header').appendChild(this.$store.state.partimation)
      particle.render()
    } else {
      this.$store.commit('cachePartimation', particle.init('.img-header'))
    }
  },
  beforeMount () {
    this.$store.commit('hideNav')
  },
  beforeDestroy () {
    this.$store.commit('showNav')
    particle.stopRender()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img-header {
  position: relative;
  width: 100%;
  // background-image: url(http://7xoxzw.com1.z0.glb.clouddn.com/walt_disney_dreams_pursue_typography_3000x2000-2015-12-01-0203.jpg);
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;
  background-color: #fff;
  .canvas-replay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    padding: 10px 20px;
    margin: 20px 10px;
    text-decoration: none;
    color: #555;
  }
  #canvas {
    width: 100%;
    height: 100%;
    // position: absolute;
    // top: 0;
    // left: 0;
  }
  // .site-title {
  //   color: #fff;
  //   font-size: 50px;
  //   position: absolute;
  //   left: 50%;
  //   top: 15%;
  //   transform: translateX(-50%);
  // }
  .link-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 5;
    text-align: right;
    box-sizing: border-box;
    padding-right: 50px;
    a {
      display: inline-block;
      padding: 10px 20px;
      border: 1px #555 solid;
      border-radius: 0.5rem;
      margin: 20px 10px;
      text-decoration: none;
      color: #555;
      &:nth-child(1) {
        // color: #dcc6a1;
        // border-color: #dcc6a1;
        transition: all 0.3s ease;
        &:hover, &.router-link-active {
          color: #79bbb9;
          border-color: #79bbb9;
        }
      }
      &:nth-child(2) {
        // color: #c6c7a5;
        // border-color: #c6c7a5;
        transition: all 0.3s ease;
        &:hover, &.router-link-active {
          color: #b3699c;
          border-color: #b3699c;
        }
      }
      &:nth-child(3) {
        // color: #a1bdaf;
        // border-color: #a1bdaf;
        transition: all .3s ease;
        &:hover, &.router-link-active {
          color: #80a357;
          border-color: #80a357;
        }
      }
      &:nth-child(4) {
        // color: #baabbe;
        // border-color: #baabbe;
        transition: all .3s ease;
        &:hover, &.router-link-active {
          color: #a7845a;
          border-color: #a7845a;
        }
      }
    }
  }
}
</style>
