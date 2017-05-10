<template>
  <div class="img-header">
    <transition name="switch">
      <div class="articles-wrapper" v-show="$store.state.activeTab == 'articles'">
        <div class="content"></div>
        <router-link :to="{ path: '/articles' }">>>点击进入</router-link>
      </div>
    </transition>
    <transition name="switch">
      <div class="categories-wrapper" v-show="$store.state.activeTab == 'categories'">
        <div class="content"></div>
        <router-link :to="{ path: '/categories' }">>>点击进入</router-link>
      </div>
    </transition>
    <transition name="switch">
      <div class="achieves-wrapper" v-show="$store.state.activeTab == 'achieves'">
        <div class="content"></div>
        <router-link :to="{ path: '/achieves' }">>>点击进入</router-link>
      </div>
    </transition>
    <transition name="switch">
      <div class="tags-wrapper" v-show="$store.state.activeTab == 'tags'">
        <div class="content"></div>
        <router-link :to="{ path: '/tags' }">>>点击进入</router-link>
      </div>
    </transition>
    <div class="tab-wrapper">
      <span :class="[$store.state.activeTab == 'articles' ? 'active' : '']" @click="transformTo('articles')">文章</span>
      <span :class="[$store.state.activeTab == 'categories' ? 'active' : '']" @click="transformTo('categories')">分类</span>
      <span :class="[$store.state.activeTab == 'achieves' ? 'active' : '']" @click="transformTo('achieves')">归档</span>
      <span :class="[$store.state.activeTab == 'tags' ? 'active' : '']" @click="transformTo('tags')">标签</span>
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
      this.$store.commit('changeActiveTab', type)
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
.switch-enter-active, .switch-leave-active {
  transition: opacity 1.5s, filter 2s .5s;
  transition: opacity 1.5s, -webkit-filter 2s .5s;
  filter: blur(0);
  -webkit-filter: blur(0);
}
.switch-enter, .switch-leave-active {
  opacity: 0;
  filter: blur(100px);
  -webkit-filter: blur(100px);
}
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
    top: 50%;
    left: 30%;
    .content {
        width: 318px;
        height: 75px;
        background-image: url('/public/assets/articles.png');
        background-size: 100% 100%;
    }
    a {
      display: block;
      text-decoration: none;
      text-align: right;
    }
  }
  .categories-wrapper {
    position: absolute;
    top: 50%;
    right: 15%;
    .content {
        width: 456.3px;
        height: 96px;
        background-image: url('/public/assets/categories.png');
        background-size: 100% 100%;
    }
    a {
      display: block;
      text-decoration: none;
      text-align: right;
    }
  }
  .achieves-wrapper {
    position: absolute;
    top: 5%;
    left: 50%;
    margin-left: -185px;
    .content {
        width: 370px;
        height: 75px;
        background-image: url('/public/assets/achieves.png');
        background-size: 100% 100%;
    }
    a {
      display: block;
      text-decoration: none;
      text-align: right;
    }
  }
  .tags-wrapper {
    position: absolute;
    top: 50%;
    right: 35%;
    .content {
        width: 193.6px;
        height: 92px;
        background-image: url('/public/assets/tags.png');
        background-size: 100% 100%;
    }
    a {
      display: block;
      text-decoration: none;
      text-align: right;
    }
  }
}
</style>
