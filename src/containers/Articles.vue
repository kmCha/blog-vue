<template>
  <loader></loader>
  <div class="articles container" v-if="!loading">
    <div class="page-title">
      <h1>第{{onPage}}页文章</h1>
    </div>
    <div v-for="article in articles">
      <article-list-item :article="article" :key="$key"></article-list-item>
    </div>
    <div class="page-selector">
      <div class="page-selector-wrapper">
        <div class="page-selector-item" @click="prePage">《</div>
        <div v-for="n in numOfPages" class="page-selector-item {{n===onPage-1 ? 'active':''}}" @click="setPage">{{n + 1}}</div>
        <div class="page-selector-item" @click="nextPage">》</div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleListItem from '../components/ArticleListItem.vue'
import Loader from '../components/Loader.vue'
import { loadingMixin } from '../mixin'
import inertDuoshuo from '../utils/duoshuo'
import domReady from '../utils/domReady'

export default {
  data () {
    return {
      numsPerPage: 5,
      onPage: 1
    }
  },
  watch: {
    'onPage' () {
      document.body.scrollTop = this.$store.state.windowHeight
      // 多说评论数
      inertDuoshuo()
    }
  },
  computed: {
    articles () {
      let articles = this.$store.state.articles
      let articlesToShow = {}
      let count = 0
      for (let key in articles) {
        if (count < this.onPage * this.numsPerPage && count >= (this.onPage - 1) * this.numsPerPage) {
          articlesToShow[key] = articles[key]
        }
        count++
      }
      return articlesToShow
    },
    numOfPages () {
      return Math.ceil(this.$store.getters.articlesLength / this.numsPerPage)
    }
  },
  methods: {
    setPage (e) {
      this.onPage = Number(e.target.innerHTML)
    },
    prePage () {
      if (this.onPage > 1) {
        this.onPage--
      }
    },
    nextPage () {
      if (this.onPage < this.numOfPages) {
        this.onPage++
      }
    }
  },
  ready () {
    this.onPage = this.$store.state.onPage
  },
  attached () {
    // 多说评论数
    domReady('.article-list-item').then(() => {
      inertDuoshuo()
    })
    document.body.scrollTop = this.$store.state.windowHeight
  },
  beforeDestroy () {
    this.$store.commit('setPage', this.onPage)
  },
  components: {
    ArticleListItem,
    Loader
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.articles {
  position: relative;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
  .page-title {
    text-align: center;
    border-bottom: 4px #555 dashed;
    margin-bottom: 20px;
    h1 {
      color: #444;
      margin-bottom: 50px;
    }
  }
  .page-selector {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    .page-selector-wrapper {
      border: 2px #454545 solid;
      border-radius: 10px;
      .page-selector-item {
        display: inline-block;
        padding: 5px;
        margin: 0 5px;
        cursor: pointer;
        transition: .2s color linear;
        &.active {
          color: #0dc7e3;
        }
      }
    }
  }
}
</style>
