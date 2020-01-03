<template>
  <div id="panelSupply">
    <div class="left mr-20">
      <h3>我的任务</h3>
      <section class="content">
        <h4>
          <svg-icon icon-class="icon_task_xjd" />询价单
        </h4>
        <ul class="operate">
          <li>
            <p>待报价</p>
            <router-link
              :to="{name:'enquirySupply',params:{status:'1'}}"
            >{{formData.inquiry.pend_report}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_htglv" />【询价】合同管理
        </h4>
        <ul class="operate">
          <li>
            <p>待确认</p>
            <router-link
              :to="{name:'contractSupply',params:{status:'2'}}"
            >{{formData.contract.pend_supply_confirm}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />【招标】合同管理
        </h4>
        <ul class="operate">
          <li>
            <p>待确认</p>
            <router-link
              :to="{name:'/Scontract/get_bid_scontract_list',params:{status:'2'}}"
            >{{formData.bid_contract.pend_supply_confirm}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />中标通知书
        </h4>
        <ul class="operate">
          <li>
            <p>待确认</p>
            <router-link
              :to="{name:'/Sbidwin/win_notice_list',params:{status:'4'}}"
            >{{formData.bid_win_notice.pend_supply_confirm}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />投标文件
        </h4>
        <ul class="operate">
          <li>
            <p>待制作</p>
            <router-link
              :to="{name:'/Sbid/tender_list',params:{status:'5'}}"
            >{{formData.bid_tender.pend_create}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />开标管理
        </h4>
        <ul class="operate">
          <li>
            <p>待解密</p>
            <router-link
              :to="{name:'/Sbid/open_bid_list',params:{status:'9'}}"
            >{{formData.bid_open.pend_decrypt}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
      </section>
    </div>
    <div class="right">
      <h3>
        <span>消息公告提醒</span>
        <router-link to="messageSupply">所有消息>></router-link>
      </h3>
      <ul class="content notice">
        <li
          v-for="item of messageList"
          :key="item.id"
        >{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { panel, get_message_list } from "@admin/api/panel";
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
        inquiry: {
          pend_report: 0 //询价单待报价
        },
        contract: {
          pend_supply_confirm: 0 //询价合同供应商待确认
        },
        bid_contract: {
          pend_supply_confirm: 0 //招标合同供应商待确认
        },
        bid_win_notice: {
          pend_supply_confirm: 0 //中标通知书供应商待确认
        },
        bid_open: {
          pend_decrypt: 0 //开标评标 待解密
        },
        bid_tender: {
          pend_create: 0 //投标文件待制作
        }
      },
      messageList: []
    };
  },
  created() {
    this.father.selectedKeys = ["panelSupply"];
    this.get_data_method();
    this.father.get_panel();
  },
  methods: {
    get_data_method() {
      panel()
        .then(res => {
          this.formData = res.data;
        })
        .catch(error => {
          this.$message.error(error);
        });
      get_message_list()
        .then(res => {
          this.messageList = res.data.list;
        })
        .catch(error => {
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
  @include flex(space-between, flex-start);
  .left {
    flex: 1.3;
  }
  .right {
    flex: 1;
  }
  .content {
    margin: 0px;
    h4 {
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