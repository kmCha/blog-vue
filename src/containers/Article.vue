<template>
  <div class="article container" v-if="!loading">
    <navigator></navigator>
    <div class="title">
      <h1>{{ article.title }}</h1>
      <article-info :date="article.date.substr(0,10)" :category="article.categories" :article-key="articleKey"></article-info>
    </div>
    <div class="body" v-html="article.body"></div>
    <div class="ds-thread" :data-thread-key="articleKey" :data-title="article.title" :data-url="'http://kmhaoshuai.com/#!/articles/' + articleKey"></div>
  </div>
</template>

<script>
import { loadingMixin } from '../mixins'
import domReady from '../utils/domReady'
import insertDuoshuo from '../utils/duoshuo'
import ArticleInfo from '../components/ArticleInfo'
import Navigator from '../components/Navigator'

export default {
  data () {
    return {
      articleKey: ''
    }
  },
  computed: {
    article () {
      return this.$store.state.articles[this.articleKey] || {date: ''}
    }
  },
  methods: {
    inc () {
      this.$store.commit('inc')
    }
  },
  // route: {
  //   data ({next, to}) {
  //     this.articleKey = to.params.key
  //     console.log(to.params.key)
  //     next()
  //   }
  // },
  created () {
    this.articleKey = this.$route.params.key
  },
  mounted () {
    this.$nextTick(() => {
      // 循环查询直到能访问到DOM，再加上代码高亮和图片居中等
      domReady('.body p').then(() => {
        // 代码高亮
        let codeBlocks = document.querySelectorAll('pre code')
        Array.prototype.forEach.call(codeBlocks, (block) => {
          window.hljs.highlightBlock(block)
        })
        // 图片居中
        let imgs = document.querySelectorAll('p img')
        Array.prototype.forEach.call(imgs, (img) => {
          img.classList.add('center')
        })
        // 回到顶部
        document.body.scrollTop = 0
        // 多说评论框
        insertDuoshuo()
      }).catch((e) => {
        console.log(e)
      })
    })
  },
  components: {
    ArticleInfo,
    Navigator
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../variables/index.scss";

h1 {
  color: $primary-color;
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
      color: $title-color;
    }
  }
  .body {
    h1,h2,h3,h4,h5,h6 {
      color: $secondary-title-color;
    }
    img {
      max-width: 100%;
    }
    .center {
      display: block;
      margin: 0 auto;
    }
    p > code {
      background-color: #f2f2f2;
      border: 1px solid #dedede;
      border-radius: 2px;
      font: .8em Monaco,monospace;
      padding: 1px 4px;
    }
    strong {
      color: $secondary-title-color;
    }
    p {
      line-height: 35px;
    }
    pre > code {
      border-radius: 10px;
    }
    blockquote {
      background: #E5E5E5;
      border-left: 10px solid #CCCBCB;
      margin-bottom: 20px;
      padding: 10px 6px;
    }
  }
}
</style>
