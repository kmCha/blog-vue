<template>
  <div class="img-header" :style="style">
    <canvas id="canvas" :width="width" :height="height">
      “纠西的博客”
    </canvas>
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
import Partimate from 'partimation'

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
    }
  },
  components: {
    Navigator
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$store.state.partimation) {
        this.$el.replaceChild(this.$store.state.partimation.canvas, document.querySelector('#canvas'))
      }
    })
  },
  updated () {
    this.$nextTick(() => {
      let particle = new Partimate('#canvas')

      // 缓存partimation对象，之后回到这个页面的时候展示之前的canvas而不是新的
      this.$store.commit('cachePartimation', particle)

      particle.imageConfig({ // 同canvas.context.drawImage() API的9个参数
        imgUrl: '/public/blog-title.png',
        cover: true
      })
      particle.animationConfig({
        totalFrame: 500, // 动画总时间，默认500帧
        cols: 500,
        rows: 300,
        animationType: 'easeOutElastic',
        blur: function (r, g, b, a) {
          if (r < 20 && g < 20 && b < 20 && a > 0) {
            return 0
          }
          return 10
        },
        filter: function (r, g, b, a) { // 像素filter，滤出rgba满足条件的像素
          return (g > 180 || r > 200 || b > 200) && a > 0
        },
        delay: function (index) { // particle动画执行延时，输入参数为该粒子在particles数组里的index
          return parseInt(Math.random() * 500)
        }
      })
      particle.animate()
    })
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
