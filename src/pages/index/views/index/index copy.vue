<template>
  <div id="index">
    <header>
      <img :src="logo" alt="logo">
      <div class="search-container">
        <div class="btn-container">
          <button class="switch-tab" :class="{bg:tab}" @click="() => switch_tab(true)">商品</button>
          <button class="switch-tab" :class="{bg:!tab}" @click="() => switch_tab(false)">供应商</button>
        </div>
        <a-input-search
          @search="onSearch"
          enterButton="搜索"
          v-model="searchValue"
        />
        <a-button type="primary" @click="search_online">在线询价</a-button>
      </div>
    </header>
    <section class="second-row">
      <span class="all-cate">
        全部商品分类
      </span>
      <a-menu
          v-model="current"
          mode="horizontal"
          @click="choose_item"
        >
        <a-menu-item key="supermarket">
          网上超市
        </a-menu-item>
        <a-menu-item key="enquiry">
          在线询价
        </a-menu-item>
      </a-menu>
    </section>
    <section class="third-row">
      <a-menu
        class="cates"
        style="width: 180px"
        mode="vertical"
        @click="handleClick"
        >
        <a-menu-item key="1">
          <a-icon type="mail" />
          粮油米面
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="calendar" />
          禽畜肉蛋
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="appstore" />
          水产海鲜
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="mail" />
          粮油米面
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="calendar" />
          禽畜肉蛋
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="mail" />
          粮油米面
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="calendar" />
          禽畜肉蛋
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="appstore" />
          水产海鲜
        </a-menu-item>
        <a-menu-item key="9">
          <a-icon type="mail" />
          粮油米面
        </a-menu-item>
        <a-menu-item key="10">
          <a-icon type="calendar" />
          禽畜肉蛋
        </a-menu-item>
        <a-menu-item key="11">
          <a-icon type="calendar" />
          禽畜肉蛋
        </a-menu-item>
      </a-menu>
      <div class="announce">
        <h4>Hi~欢迎来到采购云平台</h4>
        <router-link to="/login">
          <a-button type="primary">用户登录</a-button>
        </router-link>
        <br>
        <router-link to="/register/reg">
          <a-button>商家入驻</a-button>
        </router-link>
        <h3>
          <span>公告</span>
        </h3>
        <ul class="announcement">
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
          <li>采购贸易平台入驻优惠政策，优惠政策</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      logo:require("@static/images/logo.png"),
      searchValue:'',
      tab:true,
      current: [],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    switch_tab(key){
      this.searchValue = '';
      this.tab = key;
    },
    onSearch (value) {
      console.log(value)
    },
    search_online(e){
      console.log('在线询价')
    },
    choose_item(e){
      console.log(e.key)
    },
    handleClick (e) {
      console.log('click ', e)
    },
  },
};
</script>
<style lang="scss" scoped>
#index{
  width:100%;
  height: 100%;
  header{
    width: 100%;
    padding: 20px 17.5%;
    background-color: #fff;
    height: 11.5%;
    @include flex(space-between);
    img{
      @include box(346px,39px)
    }
    .search-container{
      width: 50%;
      .switch-tab{
        @include box(60px,24px);
        position: relative;
        top: 2px;
      }
      .bg{
        color:$white;
        background-color: $primary2;
      }
      .ant-input-search{
        width: 75%;
        .ant-btn{
          border:none;
          border-radius: 0;
          height: 98%;
          height: 31px;
        }
      }
      .ant-btn{
        width: 20%;
        margin-left: 3%;
        height: 33px;
        line-height: 33px;
      }
    }
  }
  .second-row{
    width: 100%;
    padding: 0 17.5%;
    background-color: #fff;
    .all-cate{
      display: inline-block;
      @include box(180px,40px,$primary2);
      line-height: 40px;
      color: $white;
      @extend .text-center;
    }
    .ant-menu{
      line-height: 37px;
      display: inline-block;
      border: none;
      .ant-menu-item{
        width: 120px;
        margin: 0 5px;
        @extend .text-center;
      }
    }
  }
  .third-row{
    @include box(100%,420px,linear-gradient(180deg,rgba(55,96,224,1) 0%,rgba(28,48,112,1) 100%));
    @include flex(space-between);
    padding: 0 17.5%;
    .cates,.announce{
      width: 180px;
      background-color: $white;
      height: 420px;
      @extend .text-center;
      /* 左侧 */
      .ant-menu-item{
        height:calc(420px/11);
        line-height:calc(420px/11);
        margin: 0;
      }
      /* 右侧 */
      h4{
        margin-top: 30px;
      }
      .ant-btn{
        border-radius: 20px;
        @extend .mt;
      }
      h3{
        margin: 30px 0 10px;
        padding-left: 10px;
        text-align: left;
        span{
          padding-bottom: 2px;
          font-size: 14px;
          border-bottom: 2px solid $primary2;
        }
      }
      .announcement{
        @include horizontalCenter(90%);
        height: 50%;
        li{
          width: 100%;
          font-size: 12px;
          @extend .ellipsis;
        }
      }
    }
  }
}
</style>
<style lang="scss">
#index{
  .ant-input-search{
    width: 75%;
    .ant-input{
      border-radius: 0;
    }
    .ant-btn{
      border:none;
      border-radius: 0;
      height: 31px;
    }
  }
}
</style>