<template>
  <div class="article-list-item">
    <div class="article-list-title">
      <h2><router-link :to="{ path: '/articles/' + articleKey }">{{article.title}}</router-link></h2>
    </div>
    <div class="article-list-body">
      <div class="article-list-img" v-html="imgHTML">
      </div>
      <div class="article-list-content" v-html="contentHTML">
      </div>
      <div class="article-list-tags">
        <article-tag v-for="tag in article.tags" :name="tag"></article-tag>
      </div>
      <article-info :date="article.date.substr(0,10)" :category="article.categories" :article-key="articleKey"></article-info>
    </div>
  </div>
</template>

<script>
import ArticleTag from './ArticleTag'
import ArticleInfo from './ArticleInfo'

export default {
  computed: {
    imgHTML () {
      let imgMatch = this.article.body.match(/<img[\w\W]*?>/)
      return imgMatch ? imgMatch[0] : ''
    },
    contentHTML () {
      let contentMatch = this.article.body.match(/<p>(?!<)[\w\W]*?<\/p>/)
      return contentMatch ? contentMatch[0] : ''
    }
  },
  props: ['article', 'article-key'],
  components: {
    ArticleTag,
    ArticleInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.article-list-item {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  padding-bottom: 40px;
  border-bottom: 4px #555 dashed;
  .article-list-title {
    text-align: center;
    a {
      text-decoration: none;
    }
  }
  .article-list-body {
    position: relative;
    .article-list-img {
      float: left;
      margin: 0 20px;
      img {
        display: inline-block;
        width: 200px;
        height: 200px;
      }
    }
    .article-list-content {
      height: 110px;
      overflow: hidden;
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
        line-height: 1.2rem;
        text-align: inherit;
      }
    }
    .article-list-tags {
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
