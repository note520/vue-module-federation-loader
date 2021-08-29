<template>
  <div>
    <h1>这是一个头部导航{{name}}</h1>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>