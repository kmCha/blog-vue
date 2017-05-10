<template>
  <div class="img-header">
    <div class="articles-wrapper">
      <router-link :to="{ path: '/articles' }">文章</router-link>
    </div>
    <div class="categories-wrapper">

      <router-link :to="{ path: '/categories' }">分类</router-link>
    </div>
    <div class="achieves-wrapper">

      <router-link :to="{ path: '/achieves' }">归档</router-link>
    </div>
    <div class="tags-wrapper">

      <router-link :to="{ path: '/tags' }">标签</router-link>
    </div>
    <div class="tab-wrapper">
      <span :class="[activeTab == 'articles' ? 'active' : '']" @click="transformTo('articles')">文章</span>
      <span :class="[activeTab == 'categories' ? 'active' : '']" @click="transformTo('categories')">分类</span>
      <span :class="[activeTab == 'achieves' ? 'active' : '']" @click="transformTo('achieves')">归档</span>
      <span :class="[activeTab == 'tags' ? 'active' : '']" @click="transformTo('tags')">标签</span>
    </div>
  </div>
</template>

<script>
import Navigator from './Navigator.vue'
import particle from '../utils/three-particle.js'

export default {
  data () {
    return {
      activeTab: ''
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
    transformTo (type) {
      particle.transformTo(type)
      this.activeTab = type
    }
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
  height: 100%;
  background-color: #000;

  .tab-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 5;
    text-align: right;
    box-sizing: border-box;
    padding-right: 50px;
    span {
      display: inline-block;
      padding: 10px 20px;
      border: 1px #fff solid;
      border-radius: 0.5rem;
      margin: 20px 10px;
      text-decoration: none;
      color: #fff;
      cursor: pointer;
      &.active {
        border: 1px #000 solid;
        color: #000;
        background-color: #fff;
      }
    }
  }
  .articles-wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
  .categories-wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
  .achieves-wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
  .tags-wrapper {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
