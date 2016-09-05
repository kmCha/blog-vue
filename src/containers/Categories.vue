<template>
  <div class="categories" v-if="!loading">
    <h1>敬请期待...</h1>
    <!-- <div v-for="category in categories">
      <a v-link="{ path: '/categories/' + $key }">{{$key}}({{category.length || '1'}})</a>
    </div> -->
  </div>
</template>

<script>
import { loadingMixin } from '../mixin'

export default {
  data () {
    return {
      msg: '分类!'
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    inc () {
      this.$store.commit('inc')
    }
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.categories {
  text-align: center;
}
</style>
