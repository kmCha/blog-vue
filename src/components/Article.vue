<template>
  <loader></loader>
  <div class="article container" v-if="!loading">
    <div class="title"><h1>{{ article.title }}</h1></div>
    <div class="body">
      {{{ article.body }}}
    </div>
  </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import { loadingMixin } from '../mixin'

export default {
  data () {
    return {
      articleKey: ''
    }
  },
  computed: {
    article () {
      return this.$store.state.articles[this.articleKey] || {}
    }
  },
  methods: {
    inc () {
      this.$store.commit('inc')
    }
  },
  route: {
    data ({next, to}) {
      this.articleKey = to.params.key
      next()
    }
  },
  attached () {
    // 循环查询直到能访问到DOM，再加上代码高亮和图片居中
    const check = () => {
      if (document.querySelectorAll('pre code').length) {
        // 代码高亮
        let codeBlocks = document.querySelectorAll('pre code')
        codeBlocks.forEach(block => {
          window.hljs.highlightBlock(block)
        })
        // 图片居中
        let imgs = document.querySelectorAll('p img')
        imgs.forEach(img => {
          img.classList.add('center')
        })
        // 回到顶部
        document.body.scrollTop = this.$store.state.windowHeight
      } else {
        window.setTimeout(() => {
          check()
        }, 50)
      }
    }
    check()
  },
  components: {
    Loader
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h1 {
  color: #0dc7e3;
}
.article {
  /*display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;*/
  .title {
    text-align: center;
    margin-bottom: 5rem;
    h1 {
      color: #ef70bb;
    }
  }
  .body {
    img {
      max-width: 100%;
    }
    .center {
      display: block;
      margin: 0 auto;
    }
    p > code {
      background-color: #effdff;
      display: inline-block;
      border-radius: 0.2rem;
      padding: 0 0.3rem;
    }
    a {
      background-color: #0dc7e3;
      border-radius: 0.2rem;
      color: #fff;
      padding: 0 0.3rem;
      transition: all 0.1s linear;
      &:hover {
        background-color: transparent;
        color: #0dc7e3;
      }
    }
    strong {
      color: #0dc7e3;
    }
  }
}
</style>
