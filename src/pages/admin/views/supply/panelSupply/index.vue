<template>
  <div id="panelSupply">
    <div class="left mr-20">
      <h3>我的任务</h3>
      <section class="content">
        <h4>
          <svg-icon icon-class="icon_task_xjd"/>
          询价单
        </h4>
        <ul class="operate">
          <li>
            <p>待报价</p>
            <router-link :to="{name:'enquirySupply',params:{status:'1'}}">
              {{formData.inquiry.pend_report}}
            </router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_htglv"/>
          合同管理
        </h4>
        <ul class="operate">
          <li>
            <p>待确认</p>
            <router-link :to="{name:'contractSupply',params:{status:'2'}}">
              {{formData.contract.pend_supply_confirm}}
            </router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
    <div class="right">
      <h3>
        <span>
          消息公告提醒
        </span>
        <router-link to="message">
          所有消息>>
        </router-link>
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
  props:{
    father:{
      type:[Object,String],
      required:true
    }
  },
  data(){
    return {
      formData: {
        inquiry: { pend_report: "" },
        contract: { pend_supply_confirm: "" },
      },
      messageList:[]
    }
  },
  filters:{
    type(value){
      switch (value) {
        case '1':
          return '询价结果通知'
          break;
        case '2':
          return '询价撤回通知'
          break;
        case '3':
          return '合同签订完成通知'
          break;
        case '5':
          return '资料审核完成通知'
          break;
        case '6':
          return '送货消息提醒'
          break;
        default:
          return '送货消息提醒'
          break;
      }
    },
    type_code(value){
      switch (value) {
        case '1':
          return '询价单编号：'
          break;
        case '2':
          return '询价单编号：'
          break;
        case '3':
          return '合同编号：'
          break;
        case '5':
          return '注册单号：'
          break;
        case '6':
          return '注册单号：'
          break;
        default:
          return '注册单号：'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ['panelSupply'];
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
#panelSupply {
  @include component;
  @include flex(space-between,flex-start);
  .left{
    flex: 1.3
  }
  .right{
    flex: 1
  }
  .content{
    margin: 0px;
    h4{
      border: none !important;
      padding: 0;
    }
  }
  h3{
    border-bottom: 2px solid rgba(232,232,232,1) !important;
    margin: 0px;
  }
  .operate{
    width: 80%;
    @extend .text-center;
    @extend .mb-10;
    @include flex;
    li{
      flex: 1;
    }
    a{
      font-weight: bold;
      font-size: 23px;
    }
  }
  .notice li{
    padding: 15px 0;
    border-bottom: 1px solid rgba(232,232,232,1);
  }
  .notice li:first-child{
    padding-top: 0;
  }
}
</style>