<template>
  <div id="app">
    <header>
      <div class="left">
        <router-link to='/' class="pointer">
          <svg-icon icon-class="top_home" />首页
        </router-link>
        <span v-if="logined" class="ml-10 mr-10">
          <a-dropdown placement="bottomCenter">
            <a class="ant-dropdown-link mr-10" href="#">
              {{username}}
            </a>
            <a-menu slot="overlay" @click="user_method">
              <a-menu-item key="logout">
                <span class="color">退出登录</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          您好，欢迎！
        </span>
        <router-link v-if="!logined" to='/login' class="pointer">
          请登录
        </router-link>
        <span v-if="!logined" style="color:#f25c19;">|</span>
        <router-link v-if="!logined" to="/register/reg" class="pointer">
          商家入驻
        </router-link>
      </div>
      <div class="right">
        <svg-icon icon-class="icon_top_erp" />
        <span class="pointer" @click="openErp">ERP平台</span>
        <svg-icon icon-class="icon_top_serve" />
        <a-dropdown>
          <a class="ant-dropdown-link server"> 服务中心 <a-icon type="down" /> </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <router-link to='/check_in_guide'>入驻指南</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to='tender_guide'>投标指南</router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to='evaluate_guide'>评标指南</router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <svg-icon v-if="logined" icon-class="icon_top_work"/>
        <span v-if="logined" @click="my_work" class="pointer work">
          我的工作台
        </span>
        <span>
          <svg-icon icon-class="top_phone" />客服热线：400-999-2350
        </span>
      </div>
    </header>
    <a-locale-provider :locale="zh_CN">
      <router-view :father='this'/>
    </a-locale-provider>
  </div>
</template>

<script>
import { logout } from '@indexApi/user';
export default {
  name: "App",
  data(){
    return{
      zh_CN:this.global.zh_CN,
      logined:false
    }
  },
  created(){
    this.$store.commit('SET_TOKEN',localStorage.getItem('token'));
    this.$store.commit('SET_TYPE',localStorage.getItem('type'));
    this.$store.commit('SET_USERNAME',localStorage.getItem('username'));
    this.check_expire_time();
  },
  computed:{
    username:function(){
      return this.$store.getters.username||'';
    }
  },
  watch:{
    $route(to,from){
      if(to.path=='/'||to.path=='/index'){
        this.check_expire_time();
      }
    }
  },
  methods:{
    check_expire_time(){
      var expire_time = new Date(localStorage.getItem('expire_time')).getTime();
      var now = new Date().getTime();
      if(now < expire_time) {
        this.logined = true;
        this.$store.commit('SET_LOGINED',true);
      }
    },
    my_work(){
      var self = this;
      var token = localStorage.getItem('token');
      var type = localStorage.getItem('type');
      if(!token){
        self.$store.commit('SET_TOKEN',null);
        self.$store.commit('SET_TYPE',null);
        self.$store.commit('SET_USERNAME',null);
        self.$confirm({
          title: '请先登录？',
          content: '是否跳转到登录页面',
          okText:'确定',
          cancelText:'取消',
          onOk() {
            self.$router.push({ path: "/login" });
          },
          onCancel() {},
        });
      }else{
        if(type==1){
          open(this.global.host+"/admin.html#/panel");
        }else if(type==0){
          open(this.global.host+"/admin.html#/panelSupply");
        }else if(type==2){
          open(this.global.host+"/admin.html#/Judge/bid_list");
        }
      }
    },
    logout(){
      var self = this;
      self.$confirm({
        title: '确认退出登录吗？',
        okText:'确定',
        cancelText:'取消',
        onOk() {
          logout().then(res=>{
            self.$store.commit('SET_TOKEN',null);
            self.$store.commit('SET_USERNAME',null);
            self.$store.commit('SET_TYPE',null);
            self.$store.commit('SET_LOGINED',false);
            self.logined = false;
            localStorage.clear();
            self.$message.success(res.msg);
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    user_method(e){
      if(e.key==='logout')this.logout();
    },
    openErp(){
      open('http://smart.acuit.net/admin.php')
    }
  }
};
</script>
<style lang="scss" scoped>
  header {
    width: 100%;
    height: 4%;
    padding: 0 17.5%;
    font-size: 12px;
    @include flex(space-between);
    background-color: rgba(238, 238, 238, 1);
    .svg-icon {
      width: 12px;
      height: 12px;
      margin: 0 5px 1px;
    }
    .work{
      color: $primary2;
    }
  }
  .ant-dropdown-menu-item{
    padding:5px 12px;
  }
  .server{
    color:rgba(0,0,0,0.65);
  }
</style>
