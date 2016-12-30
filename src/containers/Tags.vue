<template>
  <div class="tags container" v-if="!loading">
    <div class="tag-wrapper">
      <el-dropdown v-for="( tag, tagName ) in tags">
        <article-tag :name="tagName"></article-tag>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="articleKey in tag.articles">
            <router-link class="dropdown-item-link" :to="{path: '/articles/' + articleKey}">
              {{getArticleName(articleKey)}}
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { loadingMixin } from '../mixins'
import ArticleTag from '../components/ArticleTag'

export default {
  data () {
    return {
      msg: '标签!'
    }
  },
  computed: {
    tags () {
      return this.$store.state.tags
    }
  },
  methods: {
    getArticleName (key) {
      return this.$store.state.articles ? this.$store.state.articles.find(item => item.key === key).article.title : ''
    }
  },
  mixins: [loadingMixin],
  components: {
    ArticleTag
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../variables/index.scss";

.tags {
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .tag-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      margin: 10px 0;
    }
  }
}
.dropdown-item-link {
  display: block;
  text-decoration: none;
}
</style>
