<template>
  <div class="tags container" v-if="!loading">
    <navigator></navigator>
    <h1>敬请期待...</h1>
  </div>
</template>

<script>
import { loadingMixin } from '../mixins'
import Navigator from '../components/Navigator'

export default {
  data () {
    return {
      msg: '标签!'
    }
  },
  components: {
    Navigator
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
@import "../variables/index.scss";

.tags {
  text-align: center;
}
</style>
