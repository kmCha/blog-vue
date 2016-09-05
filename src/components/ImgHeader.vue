<template>
  <div class="img-header" :style="style">
    <div class="site-title">
      “纠西的博客”
    </div>
    <div class="link-wrapper">
      <a v-link="{ path: '/articles' }">文章</a>
      <a v-link="{ path: '/categories' }">分类</a>
      <a v-link="{ path: '/achieves' }">归档</a>
      <a v-link="{ path: '/tags' }">标签</a>
    </div>
  </div>
</template>

<script>
import Navigator from './Navigator.vue'

export default {
  data () {
    return {

    }
  },
  computed: {
    style () {
      return 'height:' + this.$store.state.windowHeight + 'px;'
    }
  },
  components: {
    Navigator
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img-header {
  width: 100%;
  background-image: url(http://7xoxzw.com1.z0.glb.clouddn.com/walt_disney_dreams_pursue_typography_3000x2000-2015-12-01-0203.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  .site-title {
    color: #fff;
    font-size: 50px;
    position: absolute;
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
  }
  .link-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    a {
      display: inline-block;
      padding: 10px 20px;
      border: 1px #fff solid;
      border-radius: 0.5rem;
      margin: 20px 10px;
      text-decoration: none;
      &:nth-child(1) {
        color: #dcc6a1;
        border-color: #dcc6a1;
        transition: all 0.3s ease;
        &:hover {
          color: #fff;
          border-color: #fff;
        }
      }
      &:nth-child(2) {
        color: #c6c7a5;
        border-color: #c6c7a5;
        transition: all 0.3s ease;
        &:hover {
          color: #fff;
          border-color: #fff;
        }
      }
      &:nth-child(3) {
        color: #a1bdaf;
        border-color: #a1bdaf;
        transition: all .3s ease;
        &:hover {
          color: #fff;
          border-color: #fff;
        }
      }
      &:nth-child(4) {
        color: #baabbe;
        border-color: #baabbe;
        transition: all .3s ease;
        &:hover {
          color: #fff;
          border-color: #fff;
        }
      }
    }
  }
}
</style>
