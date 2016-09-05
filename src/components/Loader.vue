<template>
  <div class="loader" :style="style" v-if="loading">
    <scale-loader color="#444" height="50px" width="10px"></pulse-loader>
  </div>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'
import { loadingMixin } from '../mixins'

export default {
  data () {
    return {
    }
  },
  computed: {
    style () {
      return 'height: ' + this.$store.state.windowHeight + 'px; width: ' + this.$store.state.windowWidth + 'px;'
    }
  },
  components: {
    ScaleLoader
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.loader {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
</style>
