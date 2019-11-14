<template>
  <div id="header">
    <header>
      <div @click="home">
        <svg-icon class="svg pointer" icon-class="logo" />
      </div>
      <img hidden :src="logo" alt="logo"/>
      <div class="search-container">
        <div class="btn-container">
          <button class="switch-tab" :class="{bg:tab}" @click="() => switch_tab(true)">最新询价</button>
          <button class="switch-tab" :class="{bg:!tab}" @click="() => switch_tab(false)">询价结果</button>
        </div>
        <a-input-search
          @search="onSearch"
          enterButton="搜索"
          v-model="keyword"
          placeholder="输入采购需求或者采购单位进行搜索"
        />
        <a-button v-if="token&&type&&priv.inquiry_list.add" type="primary" @click="search_online">发布询价</a-button>
      </div>
    </header>
    <section class="second-row">
      <span class="all-cate">在线询价</span>
      <!-- <span class="all-cate">全部商品分类</span>
      <a-menu v-model="current" mode="horizontal" @click="choose_item">
        <a-menu-item key="supermarket">网上超市</a-menu-item>
        <a-menu-item key="enquiry">在线询价</a-menu-item>
      </a-menu> -->
    </section>
    <router-view :father='this' ref="myChild"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@static/images/logo.png"),
      keyword: "",
      tab: true,
      current: ["enquiry"],
      priv:this.$store.getters.priv
    };
  },
  computed:{
    token(){
      return this.$store.getters.token
    },
    type(){
      return this.$store.getters.type
    }
  },
  methods: {
    home(){
      this.$router.push({path:'/'})
    },
    switch_tab(key) {
      this.tab = key;
    },
    onSearch(value) {
      switch (this.$route.name) {
        case 'enquiry':
          if(this.tab){
            this.$refs.myChild.get_inquiry_list_method();
          }else{
            this.$router.push({name:'notice'})
          }
          break;
        case 'notice':
          if(!this.tab){
            this.$refs.myChild.get_notice_list_method();
          }else{
            this.$router.push({name:'enquiry'})
          }
          break;
        default:
          if(this.tab){
            this.$router.push({name:'enquiry'})
          }else{
            this.$router.push({name:'notice'})
          }
          break;
      }
    },
    search_online(e) {
      window.open(this.global.host+"/admin.html#/addEnquiry");
    },
    // choose_item(e) {
    //   console.log(e.key);
    // }
  }
};
</script>
<style lang="scss" scoped>
#header {
  width: 100%;
  header {
    width: 100%;
    padding: 20px 17.5%;
    background-color: #fff;
    height: 11.5%;
    @include flex(space-between);
    .svg,img {
      @include box(346px, 51px);
    }
    .search-container {
      width: 50%;
      .switch-tab {
        @include box(80px, 30px);
        position: relative;
        top: 2px;
        font-size: 13px;
      }
      .bg {
        color: $white;
        background-color: $primary2;
      }
      .ant-input-search {
        width: 75%;
        .ant-btn {
          border: none;
          border-radius: 0;
          height: 98%;
          height: 31px;
        }
      }
      .ant-btn {
        width: 20%;
        margin-left: 3%;
        height: 33px;
        line-height: 33px;
      }
    }
  }
  .second-row {
    width: 100%;
    padding: 0 17.5%;
    background-color: #fff;
    .all-cate {
      display: inline-block;
      @include box(180px, 40px, $primary2);
      line-height: 40px;
      color: $white;
      letter-spacing: 3px;
      @extend .text-center;
    }
    // .ant-menu {
    //   position: relative;
    //   top: 1px;
    //   line-height: 37px;
    //   display: inline-block;
    //   border: none;
    //   .ant-menu-item {
    //     width: 120px;
    //     margin: 0 5px;
    //     @extend .text-center;
    //   }
    // }
  }
}
</style>