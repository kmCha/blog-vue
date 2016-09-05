<template>
  <div class="article-info">
    <span>发布于 {{date}}</span>
    <span>分类于 {{category}}</span>
    <span class="ds-thread-count" data-thread-key="{{key}}" data-count-type="comments">暂无评论</span>
  </div>
</template>

<script>
  export default {
    props: ['date', 'category', 'key']
  }
</script>

<style lang="scss" scoped>
  .article-info {
    height: 20px;
    overflow: hidden;
    text-align: center;
    span {
      display: inline-block;
      padding-left: 1px;
      padding-right: 5px;
      border-right: 2px #ef70bb solid;
      color: #0dc7e3;
      &:last-child {
        border-right: none;
      }
    }
  }
</style>
