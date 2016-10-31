<template>
  <div class="article-info">
    <span><i class="iconfont icon-calendar"></i>{{date}}</span>
    <span><i class="iconfont icon-sort"></i>{{category}}</span>
    <i class="iconfont icon-message"></i><span class="ds-thread-count" :data-thread-key="articleKey" data-count-type="comments">暂无评论</span>
  </div>
</template>

<script>
  export default {
    props: ['date', 'category', 'article-key']
  }
</script>

<style lang="scss" scoped>
@import "../variables/index.scss";

.article-info {
  height: 20px;
  overflow: hidden;
  text-align: center;
  span {
    display: inline-block;
    padding-left: 1px;
    padding-right: 5px;
    color: $font-color;
    margin-right: 10px;
    &:last-child {
      border-right: none;
    }
  }
  .iconfont {
    margin-right: 5px;
  }
}
</style>
