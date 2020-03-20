<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404" class="error-message">
      リクエストされたURLは存在しません
    </h1>
    <h1 v-else class="error-message">
      エラーが発生しました
    </h1>
    <nuxt-link class="btn" to="/">
      トップページへ戻る
    </nuxt-link>
  </div>
</template>
 
<style>
.error-message {
  text-align: center;
  font-size: 1.4em;
  margin-bottom: 1em;
}
  
.btn {
	display: table;
  margin: 0 auto;
  background-color: #222;
  color: #fff;
  padding: .5em 1.5em;
}
</style>
 
<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'blog'
}
</script>