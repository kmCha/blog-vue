<template>
  <a v-link="{ path: '/tags/' + name }" class="article-tag" :style="backgroundColor">
    {{name}}
  </a>
</template>

<script>
export default {
  data () {
    return {
      articleKey: ''
    }
  },
  computed: {
    backgroundColor () {
      return 'background-color: ' + this.$store.state.tags[this.name].color + ';'
    }
  },
  props: ['name']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.article-tag {
  position: relative;
  border-radius: 4px;
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
  margin-right: 5px;
  padding: 1px 5px;
  text-transform: uppercase;
  line-height: 20px;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
}
</style>
