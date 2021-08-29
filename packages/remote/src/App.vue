<template>
  <div class="remote-page">
    <h1>hello app remote！</h1>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // Header
  },
  data() {
    return {};
  },
  computed: {},
  created() {
  },
  mounted() {
    console.log("app mounted href:", window.location.href);
    console.warn(`APP_ENV:${process.env.APP_ENV}`);
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.app-page{
  background: #ccc;
  h1{
    color: red;
  }
}
</style>
