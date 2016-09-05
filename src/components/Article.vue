<template>
  <loader></loader>
  <div class="article container" v-if="!loading">
    <div class="title"><h1>{{ article.title }}</h1></div>
    <div class="body">
      {{{ article.body }}}
    </div>
    <div class="ds-thread" data-thread-key="{{articleKey}}" data-title="{{article.title}}" data-url="http://kmhaoshuai.com/#!/articles/{{articleKey}}"></div>
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
      if (document.querySelector('.body p')) {
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
        // 多说评论框
        let dsScript = document.querySelector('.duoshuo-script')
        if (dsScript) {
          document.body.removeChild(dsScript)
          delete window.$ds
          delete window.DUOSHUO
        }
        let ds = document.createElement('script')
        ds.type = 'text/javascript'
        ds.async = true
        ds.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.unstable.js'
        ds.charset = 'UTF-8'
        ds.classList.add('duoshuo-script')
        document.body.appendChild(ds)
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
    h1,h2,h3,h4,h5,h6 {
      color: #0dc7e3;
    }
    img {
      max-width: 100%;
    }
    .center {
      display: block;
      margin: 0 auto;
    }
    p > code {
      background-color: #8ff0ff;
      color: #000;
      display: inline-block;
      border-radius: 0.2rem;
      padding: 0 0.3rem;
      line-height: 30px;
    }
    a {
      color: #0dc7e3;
      text-decoration: underline;
      padding: 0 0.3rem;
    }
    strong {
      color: #0dc7e3;
    }
    p {
      line-height: 40px;
    }
  }
}
</style>
