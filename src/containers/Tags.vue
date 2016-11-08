<template>
  <div class="tags container" v-if="!loading">
    <div class="tag-wrapper">
      <article-tag v-for="( tag, tagName ) in tags" :name="tagName"></article-tag>
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
  mounted () {

  },
  mixins: [loadingMixin],
  components: {
    ArticleTag
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../variables/index.scss";

.tags {
  text-align: center;
}
.tag-wrapper {
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  div {
    margin: 10px 0;
  }
}
</style>
