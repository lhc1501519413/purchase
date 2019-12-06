<template>
  <div id="index">
    <header>
      <div @click="toFront" class="logo">
        <svg-icon icon-class="logo" />
      </div>
      <a-button class="collapsed-btn" @click="toggleCollapsed" style="margin-bottom: 16px">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="right">
        <a href="javascript:;" class="mr-10" title="返回前台" @click="toFront">
          <svg-icon icon-class="icon_topnav_store_n" />
        </a>
        <a-dropdown placement="bottomCenter" v-if="type!=2">
          <span class="ant-dropdown-link mr-10">
            <a-badge :count="panelCount">
              <svg-icon class="pointer" icon-class="icon_topnav_task" />
            </a-badge>
          </span>
          <a-menu slot="overlay" @click="toTarget">
            <a-menu-item key="1" disabled>
              <h4 style="color:rgba(0, 0, 0, 0.85);">待办任务</h4>
            </a-menu-item>
            <a-menu-divider />
            <!-- 采购方 -->
            <a-menu-item v-if="formData.inquiry.pend_audit>0" key="enquiry-1" data-status="2">
              询价单 | 待审核 |
              <span class="color">{{formData.inquiry.pend_audit}}条</span>
            </a-menu-item>
            <a-menu-item v-if="formData.inquiry.pend_confirm>0" key="enquiry-2" data-status="4">
              询价单 | 待确认 |
              <span class="color">{{formData.inquiry.pend_confirm}}条</span>
            </a-menu-item>
            <a-menu-item v-if="formData.contract.pend_draft>0" key="contract-1" data-status="1">
              合同管理 | 待起草 |
              <span class="color">{{formData.contract.pend_draft}}条</span>
            </a-menu-item>
            <a-menu-item v-if="formData.contract.pend_confirm>0" key="contract-2" data-status="4">
              合同管理 | 待确认 |
              <span class="color">{{formData.contract.pend_confirm}}条</span>
            </a-menu-item>
            <a-menu-item v-if="formData.contract.re_back>0" key="contract-3" data-status="3">
              合同管理 | 供应商已退回 |
              <span class="color">{{formData.contract.re_back}}条</span>
            </a-menu-item>
            <a-menu-item
              v-if="formData.supply && formData.supply.pend_audit>0"
              key="supplyManage-1"
              data-status="1"
            >
              供应商审核 | 待审核 |
              <span class="color">{{formData.supply.pend_audit}}条</span>
            </a-menu-item>
            <!-- 供应商 -->
            <a-menu-item
              v-if="formData.inquiry.pend_report>0"
              key="enquirySupply-1"
              data-status="1"
            >
              询价单 | 待报价 |
              <span class="color">{{formData.inquiry.pend_report}}条</span>
            </a-menu-item>
            <a-menu-item
              v-if="formData.contract.pend_supply_confirm>0"
              key="contractSupply-1"
              data-status="2"
            >
              合同管理 | 待确认 |
              <span class="color">{{formData.contract.pend_supply_confirm}}条</span>
            </a-menu-item>
            <a-menu-item disabled v-if="panelCount==0">
              <img class="m-10" :src="messageSlot" alt="暂无信息" />
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item :key="com_info?'panel-1':'panelSupply-1'" class="text-center color">所有任务</a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown placement="bottomCenter" v-if="type!=2">
          <span class="ant-dropdown-link mr-10">
            <a-badge :count="messageCount">
              <svg-icon class="pointer" icon-class="icon_topnav_bell" />
            </a-badge>
          </span>
          <a-menu v-if="messageList.length" slot="overlay" @click="toMessage">
            <a-menu-item key="key1" disabled class="message">
              <h4 style="color:rgba(0, 0, 0, 0.85);">消息</h4>
            </a-menu-item>
            <a-menu-item
              class="message"
              v-for="(item,index) of messageList"
              :key="index"
            >{{item.title}}</a-menu-item>
            <a-menu-divider />
            <a-menu-item class="text-center color message">所有消息</a-menu-item>
          </a-menu>
          <a-menu v-else slot="overlay">
            <a-menu-item key="key1" disabled>
              <h4 style="color:rgba(0, 0, 0, 0.85);">消息</h4>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item disabled>
              <img class="m-10" :src="messageSlot" alt="暂无信息" />
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item class="text-center color">
              <router-link :to="com_info?'message':'messageSupply'">所有消息</router-link>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-dropdown placement="bottomCenter">
          <span class="ant-dropdown-link mr-10 color pointer">{{user_name}}</span>
          <a-menu slot="overlay" @click="user_method">
            <a-menu-item key="logout">
              <span class="color">退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </header>
    <a-menu
      class="nav"
      :class="{width:!collapsed}"
      :defaultOpenKeys="defaultOpenKeys"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
      @click="changeMenuItem"
      :selectedKeys="selectedKeys"
      >
      <!-- <a-menu-item v-if="type==1" key="bids">
        <svg-icon icon-class="icon_sidenav_home_h" />
        <span v-show="!collapsed">招标管理</span>
      </a-menu-item>
      <a-menu-item v-if="type==0" key="tender">
        <svg-icon icon-class="icon_sidenav_home_h" />
        <span v-show="!collapsed">投标管理</span>
      </a-menu-item> -->
      <a-menu-item v-if="type==1" key="panel">
        <svg-icon icon-class="icon_sidenav_home_h" />
        <span v-show="!collapsed">我的面板</span>
      </a-menu-item>
      <a-menu-item v-if="type==0" key="panelSupply">
        <svg-icon icon-class="icon_sidenav_home_h" />
        <span v-show="!collapsed">我的面板</span>
      </a-menu-item>
      <a-menu-item v-if="type==1" key="message">
        <svg-icon icon-class="icon_sidenav_mes_h" />
        <span v-show="!collapsed">我的消息</span>
      </a-menu-item>
      <a-menu-item v-if="type==0" key="messageSupply">
        <svg-icon icon-class="icon_sidenav_mes_h" />
        <span v-show="!collapsed">我的消息</span>
      </a-menu-item>
      <a-sub-menu v-if="type==0" key="sub1">
        <span slot="title">
          <svg-icon icon-class="icon_sidenav_Entering_h" />
          <span v-show="!collapsed">入驻信息管理</span>
        </span>
        <!-- --------------------------- 供应商未审核完成 --------------------------------- -->
        <a-menu-item v-if="supply_info.is_audit==0" key="supply_info">供应商入驻</a-menu-item>
        <a-menu-item key="basic_info">基本信息管理</a-menu-item>
        <a-menu-item key="registerChange">注册变更记录</a-menu-item>
      </a-sub-menu>
      <template v-for="item in menu_list">
        <a-menu-item v-if="JSON.stringify(item.children)==='[]'" :key="item.key">
          <svg-icon v-if="item.key==='/supply/get_apply_list'" icon-class="icon_sidenav_supplier_h" />
          <svg-icon v-if="item.key==='/Apply/get_supply_list'" icon-class="icon_sidenav_list_h" />
          <svg-icon v-if="item.key==='//bid_mangge'" icon-class="icon_sidenav_Entering_h" />
          <svg-icon v-if="item.key==='//project_eval'" icon-class="icon_sidenav_Entering_h" />
          <!-- <svg-icon v-else icon-class="icon_sidenav_Entering_h" /> -->
          <span v-show="!collapsed">{{item.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :collapsed="collapsed" :key="item.key" />
      </template>
      <!-- <a-sub-menu v-if="type==0" key="sub3">
        <span slot="title">
          <svg-icon icon-class="icon_sidenav_Entering_h" />
          <span v-show="!collapsed">招标管理</span>
        </span>
        <a-menu-item key="bidsSupply">获取采购文件</a-menu-item>
      </a-sub-menu> -->
    </a-menu>
    <router-view
      v-if="isShow"
      class="layout"
      :father="this"
      :class="!collapsed?'margin220':'margin80'"
    />
  </div>
</template>

<script>
import { menu_list } from "@admin/api/menuList";
import { panel, get_message_list } from "@admin/api/panel";
import { base_info, logout } from "@indexApi/user";
import SubMenu from '@admin/components/SubMenu';
export default {
  components: {
    'sub-menu': SubMenu,
  },
  data() {
    return {
      com_info: {},
      supply_info: {},
      type: null,
      menu_list:[],
      collapsed: false,
      user_name: this.$store.getters.username,
      selectedKeys: ["panel"],
      defaultOpenKeys: ["//online_inquiry","//bid_mangge","//project_eval","sub1","sub2","sub3"],
      panelCount: "",
      formData: {
        inquiry: {
          pend_report: 0, //询价单待报价
          pend_audit: 0, //询价单待审核
          pend_confirm: 0 //询价单待确认
        },
        contract: {
          pend_supply_confirm: 0, //合同供应商待确认
          pend_draft: 0, //合同待起草
          pend_confirm: 0, //合同待确认
          re_back: 0 //合同供应商退回
        },
        supply: {
          pend_audit: 0 //供应商待审核
        }
      },
      messageList: [],
      messageCount: "",
      messageSlot: require("@admin/assets/images/no_message.png"),
      isShow: true
    };
  },
  filters: {
    type(value) {
      switch (value) {
        case "1":
          return "询价结果通知";
          break;
        case "2":
          return "询价撤回通知";
          break;
        case "3":
          return "合同签订完成通知";
          break;
        case "5":
          return "资料审核完成通知";
          break;
        case "6":
          return "送货消息提醒";
          break;
        default:
          return "送货消息提醒";
          break;
      }
    },
    type_code(value) {
      switch (value) {
        case "1":
          return "询价单编号：";
          break;
        case "2":
          return "询价单编号：";
          break;
        case "3":
          return "合同编号：";
          break;
        case "5":
          return "注册单号：";
          break;
        case "6":
          return "注册单号：";
          break;
        default:
          return "注册单号：";
          break;
      }
    },
    status(value) {
      switch (value) {
        case "6":
          return "注册单号：";
          break;
        default:
          return "注册单号：";
          break;
      }
    },
    route(value) {
      switch (value) {
        case "6":
          return "注册单号：";
          break;
        default:
          return "注册单号：";
          break;
      }
    }
  },
  created() {
    base_info()
      .then(res => {
        localStorage.setItem("realname", res.data.realname);
        localStorage.setItem("type", res.data.type);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("com_info", JSON.stringify(res.data.com_info));
        localStorage.setItem(
          "supply_info",
          JSON.stringify(res.data.supply_info)
        );
        this.type = res.data.type;
        this.com_info = res.data.com_info || null;
        this.supply_info = res.data.supply_info || null;
        this.$store.commit('SET_PRIV',res.data.priv);
      })
      .catch(error => {
        this.$message.warn(error);
      });
    this.get_menu_list();
    this.get_panel();
    this.get_message();
  },
  methods: {
    get_menu_list() {
      menu_list()
        .then(res => {
          var menu_list = res.data.length?res.data[0].child:[];
          menu_list.forEach(elem=>{
            elem.children = elem.child||[];
            elem.title = elem.name;
            elem.key = `/${elem.c}/${elem.a}`;
            if(JSON.stringify(elem.children) !== '[]'){
              elem.children.forEach(elem2=>{
                elem2.key = `/${elem2.c}/${elem2.a}`;
                elem2.title = elem2.name;
              })
            }
          })
          this.menu_list = menu_list;
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    get_panel() {
      panel()
        .then(res => {
          this.formData = res.data;
          let data = res.data;
          let count = 0;
          for (let key in data) {
            if (typeof data[key] === "object") {
              for (let key2 in data[key]) {
                count += +data[key][key2];
              }
            } else count += +data[key];
          }
          this.panelCount = count;
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    get_message() {
      get_message_list(1, 0)
        .then(res => {
          this.messageList = res.data.list || [];
          this.messageCount = res.data.list ? res.data.list.length : 0;
        })
        .catch(error => {
          this.$message.error(error);
        });
    },
    changeMenuItem(e) {
      if (e.key === "supply_info") {
        if(this.supply_info.step==2) open(this.global.host + "/index.html#/register/baseInfo");
        else if(this.supply_info.step==3) open(this.global.host + "/index.html#/register/dataComplete");
        else open(this.global.host + "/index.html#/register/dataAudit");
      } else {
        if (this.$route.name === e.key) {
          this.reload();
        } else {
          this.$router.push({ name: e.key });
        }
      }
    },
    reload() {
      // 先隐藏
      this.isShow = false;
      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    logout() {
      var self = this;
      self.$confirm({
        title: "确认退出登录吗？",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          logout()
            .then(res => {
              self.$store.commit("SET_TOKEN", null);
              self.$store.commit("SET_USERNAME", null);
              self.$store.commit("SET_TYPE", null);
              localStorage.clear();
              self.$message.success(res.msg);
              location.href = self.global.host + "/index.html#/index";
            })
            .catch(error => {
              self.$message.error(error);
            });
        },
        onCancel() {}
      });
    },
    toFront() {
      location.href = this.global.host + "/index.html#/index";
    },
    toTarget(e) {
      this.$router.push({
        name: e.key.slice(0, -2),
        params: { status: e.domEvent.target.dataset.status || void 0 }
      });
    },
    toMessage(e) {
      var route = this.com_info ? "message" : "messageSupply";
      var text = this.messageList[e.key];
      this.$router.push({ name: route, params: { text } });
      if (this.$route.name === route) this.reload();
    },
    user_method(e) {
      if (e.key === "logout") this.logout();
    }
  }
};
</script>

<style lang="scss">
#index {
  height: 100%;
  header {
    width: 100%;
    height: 52px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    background-color: $white;
    .logo {
      @extend .pointer;
      padding: 10px;
      position: absolute;
      left: 0;
      width: 220px;
      height: 100%;
      .svg-icon {
        width: 100%;
        height: 100%;
      }
    }
    .collapsed-btn {
      margin-left: 220px;
      border: none;
      margin-bottom: 16px;
      height: 50px;
      font-size: 20px;
    }
    .right {
      position: absolute;
      height: 20px;
      right: 10px;
      top: 15px;
      .ant-badge .ant-badge-count {
        width: 25px;
        height: 15px;
        font-size: 10px;
        line-height: 15px;
        text-align: center;
        padding: 0;
      }
      .head-img {
        width: 20px;
      }
      .user-name {
        width: 20px;
        font-size: 15px;
      }
    }
  }
  .nav {
    box-sizing: border-box;
    height: 100%;
    position: fixed;
    top: 52px;
    left: 0;
    z-index: 6;
    overflow-y:auto;
    &::-webkit-scrollbar {
      width: 0px;
    }
    .svg-icon {
      width: 14px;
      margin-right: 5px;
    }
  }
  .width {
    width: 220px;
  }
  .margin220 {
    margin-left: 220px;
    transition: margin-left 0.2s;
    -moz-transition: margin-left 0.2s; /* Firefox 4 */
    -webkit-transition: margin-left 0.2s; /* Safari 和 Chrome */
    -o-transition: margin-left 0.2s; /* Opera */
  }
  .margin80 {
    margin-left: 80px;
    transition: margin-left 0.2s;
    -moz-transition: margin-left 0.2s; /* Firefox 4 */
    -webkit-transition: margin-left 0.2s; /* Safari 和 Chrome */
    -o-transition: margin-left 0.2s; /* Opera */
  }
  .layout {
    position: relative;
    padding: 16px;
    top: 52px;
  }
}
.ant-dropdown-menu-item.message {
  @extend .ellipsis;
  width: 230px;
}
</style>