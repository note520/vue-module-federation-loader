<template>
  <div class="host-page">
    <h1>HOST</h1>
    <button @click="onGetMod">异步获取模块</button>
    <button @click="onRemoveMod">移除加载模块JS</button>
    <router-view />
    <hr/>
    <h4>MF loading...</h4>
    <component :is="currentComponent"></component>
    <Header text="remote1"></Header>
  </div>
</template>

<script>
const Header = async()=> await $MF.lazyLoad('remote/Header');
export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      remoteHeader:null,
      currentComponent:null
    };
  },
  computed: {},
  created() {
    // this.getRemoteHeader();
  },
  mounted() {
    console.log("app mounted href:", window.location.href);
    console.log(`APP_ENV:${process.env.APP_ENV}`);
    console.warn('getOptions:',$MF.getOptions('remote'));
  },
  methods:{
    async onGetMod(){
     const remote1Footer = await $MF.lazyLoad('remote/Footer');
     console.warn('----remote1 Footer----',remote1Footer);
     this.currentComponent = remote1Footer;
    },
    onRemoveMod(){
      console.warn('----onRemoveMod----');
      $MF.removeLoad('remote');
    }
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
