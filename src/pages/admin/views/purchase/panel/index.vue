<template>
  <div id="panel">
    <div class="left mr-20">
      <h3>我的任务</h3>
      <section class="content">
        <h4>
          <svg-icon icon-class="icon_task_xjd"/>
          询价单
        </h4>
        <ul class="operate">
          <li>
            <p>待审核</p>
            <router-link :to="{name:'enquiry',params:{status:'2'}}">{{formData.inquiry.pend_audit}}</router-link>
          </li>
          <li>
            <p>待确认</p>
            <router-link
              :to="{name:'enquiry',params:{status:'4'}}"
            >{{formData.inquiry.pend_confirm}}</router-link>
          </li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_htglv"/>
          合同管理
          </h4>
        <ul class="operate">
          <li>
            <p>待起草</p>
            <router-link
              :to="{name:'contract',params:{status:'1'}}"
            >{{formData.contract.pend_draft}}</router-link>
          </li>
          <li>
            <p>待确认</p>
            <router-link
              :to="{name:'contract',params:{status:'4'}}"
            >{{formData.contract.pend_confirm}}</router-link>
          </li>
          <li>
            <p>供应商已退回</p>
            <router-link :to="{name:'contract',params:{status:'3'}}">{{formData.contract.re_back}}</router-link>
          </li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh"/>
          供应商审核
        </h4>
        <ul class="operate">
          <li>
            <p>待审核</p>
            <router-link
              :to="{name:'supplyManage',params:{status:'1'}}"
            >{{formData.supply.pend_audit}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
    <div class="right">
      <h3>
        <span>消息公告提醒</span>
        <router-link to="message">所有消息>></router-link>
      </h3>
      <ul class="content notice">
        <li v-for="item of messageList" :key='item.id'>【{{item.type|type}}】{{item.type|type_code}}{{item.code}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { panel,get_message_list } from "@admin/api/panel";
export default {
  props: {
    father: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      formData: {
        inquiry: { pend_audit: "", pend_confirm: "" },
        contract: { pend_draft: "", pend_confirm: "", re_back: "" },
        supply: { pend_audit: "" }
      },
      messageList:[]
    };
  },
  filters:{
    type(value){
      switch (value) {
        case '4':
          return '合同退回通知'
          break;
        case '7':
          return '供应商回复送货消息通知'
          break;
        case '8':
          return '发起询价通知'
          break;
        default:
          return '发起询价通知'
          break;
      }
    },
    type_code(value){
      switch (value) {
        case '4':
          return '合同编号：'
          break;
        case '7':
          return '合同编号：'
          break;
        case '8':
          return '合同编号：'
          break;
        default:
          return '注册单号：'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ["panel"];
    this.get_data_method();
    this.father.get_panel();
  },
  methods:{
    get_data_method(){
      panel().then(res => {
        this.formData = res.data;
      }).catch(error => {
        this.$message.error(error);
      });
      get_message_list().then(res=>{
        this.messageList = res.data.list;
      }).catch(error => {
        this.$message.error(error);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#panel {
  @include component;
  @include flex(space-between, flex-start);
  .left {
    flex: 1.3;
  }
  .right {
    flex: 1;
  }
  .content {
    margin: 0px;
    h4{
      border: none !important;
      padding: 0;
    }
  }
  h3 {
    border-bottom: 2px solid rgba(232, 232, 232, 1) !important;
    margin: 0px;
  }
  .operate {
    width: 80%;
    @extend .text-center;
    @extend .mb-10;
    @include flex;
    li {
      flex: 1;
    }
    a {
      font-weight: bold;
      font-size: 23px;
    }
  }
  .notice li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
  }
  .notice li:first-child {
    padding-top: 0;
  }
}
</style>