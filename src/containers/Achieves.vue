<template>
  <div class="achieves" v-if="!loading">
    <h1>敬请期待...</h1>
  </div>
</template>

<script>
import { loadingMixin } from '../mixins'

export default {
  data () {
    return {
      msg: '归档!'
    }
  },
  computed: {
    count () {
      return this.$store.getters.count
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
.achieves {
  text-align: center;
}
</style>
