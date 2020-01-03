<template>
  <div id="panel">
    <div class="left mr-20">
      <h3>我的任务</h3>
      <section class="content">
        <h4>
          <svg-icon icon-class="icon_task_xjd" />询价单
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
          <svg-icon icon-class="icon_task_htglv" />【询价】合同管理
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
          <li></li>
          <!-- <li>
            <p>供应商已退回</p>
            <router-link :to="{name:'contract',params:{status:'3'}}">{{formData.contract.re_back}}</router-link>
          </li>-->
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />供应商审核
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
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />【招标】合同管理
        </h4>
        <ul class="operate">
          <li>
            <p>待起草</p>
            <router-link
              :to="{name:'/Contract/get_bid_contract_list',params:{status:'1'}}"
            >{{formData.bid_contract.pend_draft}}</router-link>
          </li>
          <li>
            <p>待确认</p>
            <router-link
              :to="{name:'/Contract/get_bid_contract_list',params:{status:'4'}}"
            >{{formData.bid_contract.pend_confirm}}</router-link>
          </li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />【招标】项目管理
        </h4>
        <ul class="operate">
          <li>
            <p>待审核</p>
            <router-link
              :to="{name:'/Bid/bid_list',params:{status:'2'}}"
            >{{formData.bid.pend_audit}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />采购文件制作
        </h4>
        <ul class="operate">
          <li>
            <p>待制作</p>
            <router-link
              :to="{name:'/Bid/purchase_list',params:{status:'8'}}"
            >{{formData.bid_purchase.pend_create}}</router-link>
          </li>
          <li>
            <p>待审核</p>
            <router-link
              :to="{name:'/Bid/purchase_list',params:{status:'9'}}"
            >{{formData.bid_purchase.pend_audit}}</router-link>
          </li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />获取采购文件管理
        </h4>
        <ul class="operate">
          <li>
            <p>待审核</p>
            <router-link
              :to="{name:'/Bid/ask_purchase_list'}"
            >{{formData.bid_ask_purchase.pend_audit}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />开标评标
        </h4>
        <ul class="operate">
          <li>
            <p>待开标</p>
            <router-link
              :to="{name:'/Bid/open_bid_list',params:{status:'15'}}"
            >{{formData.bid_open.pend_open}}</router-link>
          </li>
          <li></li>
          <li></li>
        </ul>
        <h4>
          <svg-icon icon-class="icon_task_gyssh" />中标通知书
        </h4>
        <ul class="operate">
          <li>
            <p>待制作</p>
            <router-link
              :to="{name:'/Bidwin/win_notice_list',params:{status:'1'}}"
            >{{formData.bid_win_notice.pend_draft}}</router-link>
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
      priv:this.$store.getters.priv,
      formData: {
        inquiry: {
          pend_audit: 0, //询价单待审核
          pend_confirm: 0 //询价单待确认
        },
        contract: {
          pend_draft: 0, //合同待起草
          pend_confirm: 0, //合同待确认
          re_back: 0 //合同供应商退回
        },
        bid_contract: {
          pend_draft: 0, //招标合同待起草
          pend_confirm: 0 //招标合同待确认
        },
        bid: {
          pend_audit: 0 //招标项目待制作
        },
        bid_purchase: {
          pend_create: 0, //招标采购文件待制作
          pend_audit: 0 //招标采购文件待审核
        },
        bid_ask_purchase: {
          pend_audit:0,//招标获取采购文件待审核
        },
        bid_win_notice: {
          pend_draft:0,//中标通知书带起草
        },
        bid_open: {
          pend_open: 0 //招标项目待开标
        },
        supply: {
          pend_audit: 0 //供应商待审核
        }
      },
      messageList: []
    };
  },
  created() {
    this.father.selectedKeys = ["panel"];
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