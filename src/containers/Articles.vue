<template>
  <div class="articles container" v-if="!loading">
    <div class="page-title">
      <h1>第{{onPage}}页文章</h1>
    </div>
      <div v-for="(article, key) in articles" :key="key">
        <article-list-item :article="article" :article-key="key"></article-list-item>
      </div>
    <div class="page-selector">
      <div class="page-selector-wrapper">
        <router-link class="page-selector-item" :to="{path: '/articles/page/' + prevPage}">《</router-link>
        <router-link v-for="n in numOfPages" class="page-selector-item" :to="{path: '/articles/page/' + n}">{{n}}</router-link>
        <router-link class="page-selector-item" :to="{path: '/articles/page/' + nextPage}">》</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleListItem from '../components/ArticleListItem.vue'
import { loadingMixin } from '../mixins'
import { insertDuoshuo, domReady, scrollBodyTo } from '../utils'

export default {
  data () {
    return {
      numsPerPage: 5,
      onPage: 1
    }
  },
  watch: {
    '$route': 'changePage'
  },
  methods: {
    changePage (to, from) {
      if (this.$route.params.page > this.numOfPages) {
        this.$router.back()
      } else {
        this.onPage = this.$route.params.page
        domReady('.article-list-item').then(() => {
          // 多说评论数
          insertDuoshuo()
          scrollBodyTo(0)
        })
      }
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
    },
    prevPage () {
      return Number(this.onPage) === 1 ? 1 : Number(this.onPage) - 1
    },
    nextPage () {
      return Number(this.onPage) === Number(this.numOfPages) ? Number(this.onPage) : Number(this.onPage) + 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.changePage()
    })
  },
  components: {
    ArticleListItem
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../variables/index.scss";

.articles {
  position: relative;
  .page-title {
    text-align: center;
    border-bottom: 4px #555 dashed;
    margin-bottom: 20px;
    h1 {
      color: $title-color;
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
      border: 2px $secondary-title-color solid;
      border-radius: 10px;
      .page-selector-item {
        display: inline-block;
        padding: 5px;
        margin: 0 5px;
        cursor: pointer;
        transition: .2s color linear;
        text-decoration: none;
        &:hover {
          color: inherit;
        }
        &.router-link-active {
          color: $primary-color;
        }
        &:first-child, &:last-child {
          &.router-link-active {
            color: inherit;
          }
        }
      }
    }
  }
}
</style>
