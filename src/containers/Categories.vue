<template>
  <div class="categories container" v-if="!loading">
    <navigator></navigator>
    <el-tree :data="categories" @node-click="handleClick"></el-tree>
  </div>
</template>

<script>
import { loadingMixin } from '../mixins'
import Navigator from '../components/Navigator'

export default {
  data () {
    return {
      msg: '分类!'
    }
  },
  components: {
    Navigator
  },
  computed: {
    categories () {
      let data = []
      let categories = this.$store.state.categories
      for (let key in categories) {
        let children = typeof categories[key] === 'string' ? [categories[key]] : categories[key]
        data.push({
          label: key,
          children: children.map(articleKey => {
            return {
              key: articleKey,
              label: this.$store.state.articles[articleKey].title
            }
          })
        })
      }
      return data
    }
  },
  methods: {
    // renderAnchor (h, {node}) {
    //   if (node.isLeaf) {
    //     return h('router-link', {
    //       attrs: {
    //         to: {
    //           path: '/articles/' + node.data.key
    //         }
    //       }
    //     }, [node.data.label])
    //   } else {
    //     return h('span', {}, [
    //       node.data.label
    //     ])
    //   }
    // },
    handleClick (obj, node) {
      if (!node.isLeaf) return
      this.$router.push('/articles/' + node.data.key)
    }
  },
  mixins: [loadingMixin]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../variables/index.scss";

.categories {
  // text-align: center;
  .el-tree {
    border: none;
    .el-tree-node__content {
      .el-tree-node__label {
        font-size: 18px;
      }
      .el-tree-node__expand-icon {
        border-left-color: $font-color;
        &.is-leaf {
          border-color: transparent;
        }
      }
      &:hover {
        background: $font-color;
        color: #fff;
        .el-tree-node__expand-icon {
          border-left-color: #fff;
          &.is-leaf {
            border-color: transparent;
          }
        }
      }
    }
  }
}
</style>
