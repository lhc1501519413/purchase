<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
      <router-view />
    </a-locale-provider>
      <button @click="request">request</button>
      <button @click="jump1">window.open("/admin.html")</button>
      <button @click="jump2">window.open("/admin.html#/enterlist")</button>
      <button @click="jump3">window.open(this.global.host + "/admin.html")</button>
      <button @click="jump4">window.open(this.global.host + "/admin.html#/enterlist")</button>
      <button @click="jump5">window.location.href="/admin.html"</button>
      <button @click="jump6">window.location.href="/admin.html#/enterlist"</button>
      <button @click="jump7">window.location.href=this.global.host + "/admin.html"</button>
      <button @click="jump8">window.location.href=this.global.host + "/admin.html#/enterlist"</button>
  </div>
</template>

<script>
import { all_city } from '@common/js/apis'
export default {
  name: "App",
  data(){
    return{
      zh_CN:this.global.zh_CN,
    }
  },
  created(){
    this.add_routes();
  },
  mounted() {
    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "关闭提示";
    //   }
    //   return "关闭提示";
    // };
  },
  methods:{
    add_routes(){
      let routes = JSON.parse(sessionStorage.getItem("routes"));
      if(routes){
        this.$common.add_routes(this,routes)
      }
    },
    jump1(){
      window.open("/admin.html")
    },
    jump2(){
      window.open("/admin.html#/enterlist")
    },
    jump3(){
      window.open(this.global.host + "/admin.html")
    },
    jump4(){
      window.open(this.global.host + "/admin.html#/enterlist")
    },
    jump5(){
      window.location.href="/admin.html"
    },
    jump6(){
      window.location.href="/admin.html#/enterlist"
    },
    jump7(){
      window.location.href=this.global.host + "/admin.html"
    },
    jump8(){
      window.location.href=this.global.host + "/admin.html#/enterlist"
    },
    request(){
      all_city({"c":"public","a":"get_all_city"}).then(res=>{
      })
    }
  },
  beforeDestroy(){
    sessionStorage.clear();
  }
};
</script>
<style lang="scss">

</style>
