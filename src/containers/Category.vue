<template>
  <div class="category container" v-if="!$loading">
    <div v-for="(article, key) in articles">
      <router-link :to="{ path: '/articles/' + key }">{{article.date.substr(0,10)}} - {{article.title}}</router-link>
    </div>
  </div>
</template>

<script>
import { loadingMixin } from '../mixins'

export default {
  data () {
    return {
      categoryKey: ''
    }
  },
  computed: {
    articles () {
      let articleKeyArr = this.$store.state.categories[this.categoryKey]
      let articles = this.$store.state.articles
      let filteredArticles = {}
      articleKeyArr.forEach(key => {
        filteredArticles[key] = articles[key]
      })
      return filteredArticles
    }
  },
  methods: {
    inc () {
      this.$store.commit('inc')
    }
  },
  route: {
    data ({next, to}) {
      this.categoryKey = to.params.key
      next()
    //   if (!this.$store.state.categories) {
    //     return this.$store.dispatch('getCategories').catch(res => {
    //       console.log('提示网络问题')
    //     })
    //   } else {
    //     next()
    //   }
    }
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../variables/index.scss";

h1 {
  color: $title-color;
}
.category {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
