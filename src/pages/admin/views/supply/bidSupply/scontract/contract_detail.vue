<template>
  <div id="contract_detail">
    <h5>
      <span>合同管理 / 合同详情</span>
    </h5>
    <h3>
      <span>
        <span class="mr">合同编号：{{formData.code}}</span>
        <span class="ml">合同名称：{{formData.title}}</span>
      </span>
      <span class="status">状态：{{formData.status|status}}</span>
    </h3>
    <section class="content">
      <h4>基本信息</h4>
      <a-row>
        <a-col :span="3">采购项目编号：</a-col>
        <a-col :span="5">{{formData.custom_code}}</a-col>
        <a-col :span="3">项目名称：</a-col>
        <a-col :span="5">{{formData.custom_title}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">甲方(采购单位)：</a-col>
        <a-col :span="5">{{formData.com_name}}</a-col>
        <a-col :span="3">合同签约地：</a-col>
        <a-col :span="5">杭州</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">联系人：</a-col>
        <a-col :span="5">{{formData.contact_name}}</a-col>
        <a-col :span="3">联系电话：</a-col>
        <a-col :span="5">{{formData.contact_number}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">电子邮箱：</a-col>
        <a-col :span="5">{{formData.email}}</a-col>
        <a-col :span="3">详细地址：</a-col>
        <a-col :span="5">{{formData.address}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">传真：</a-col>
        <a-col :span="5">{{formData.fax}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">开户行：</a-col>
        <a-col :span="5">{{formData.bank}}</a-col>
        <a-col :span="3">银行账号：</a-col>
        <a-col :span="5">{{formData.bank_account}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">乙方(供应商名称)：</a-col>
        <a-col :span="5">{{formData.supply_name}}</a-col>
        <a-col :span="3">供应商地址：</a-col>
        <a-col :span="5">{{formData.supply_address}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">电子邮箱：</a-col>
        <a-col :span="5">{{formData.supply_email}}</a-col>
        <a-col :span="3">联系电话：</a-col>
        <a-col :span="5">{{formData.supply_contact_number}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">传真：</a-col>
        <a-col :span="5">{{formData.supply_fax}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">开户行：</a-col>
        <a-col :span="5">{{formData.supply_bank}}</a-col>
        <a-col :span="3">银行账号：</a-col>
        <a-col :span="5">{{formData.supply_bank_account}}</a-col>
      </a-row>
      <a-row>
        <a-col :span="3">是否为唯一供应商：</a-col>
        <a-col :span="5">{{formData.is_unique==1?'是':'否'}}</a-col>
      </a-row>
      <contract-components 
        ref='contract'
        :formData='formData' 
        >
        <template #margin_money>
          <a-row>
            <a-col :span="23" :offset="1">
              合同保证金：合同签订时，乙方向甲方交纳合同保证金人民币
              <span style="color:#f00;margin:0 5px;">{{formData.margin_money}}</span>
              元整，无违约情况，合同期满后无息退还。
            </a-col>
          </a-row>
        </template>
        <template #supply_sales>
          <h4 class="mt-10">售后服务</h4>
          <a-row>
            <a-col :span="5" class="text-right">供应商产品售后服务热线(固话)：</a-col>
            <a-col :span="8">{{formData.supply_sales_phone}}</a-col>
          </a-row>
          <a-row>
            <a-col :span="5" class="text-right">供应商产品售后服务联系人姓名：</a-col>
            <a-col :span="8">{{formData.supply_sales_name}}</a-col>
          </a-row>
          <a-row>
            <a-col :span="5" class="text-right">手机：</a-col>
            <a-col :span="8">{{formData.supply_sales_number}}</a-col>
          </a-row>
        </template>
      </contract-components>
      <h4 class="mt-10">合同文件</h4>
      <a-row class="mt-10">
        <a-col :span="22" :offset="1">
          在线合同：关于{{formData.title}}的合同({{formData.code}}).pdf
          <a
            href="javascript:;"
            @click="showContract"
          >预览合同</a>
          <a href="javascript:;" @click="downloadContract">下载合同</a>
        </a-col>
      </a-row>
      <h4 class="mt-10">流转日志</h4>
      <a-row class="mt-10">
        <a-steps progressDot :current="stepsCurrent" direction="vertical">
          <a-step v-for="(item,index) of formData.log_list||[]" :key="index" :title="item.create_time">
            <template slot="description">
              <div class="step-item">
                <span class="one">
                  {{item.supply_name||item.com_name}}
                </span>
                <span class="mr-10 two">
                  {{item.desc}}
                </span>
              </div>
              <div class="step-item" v-if="item.remark">
                {{item.remark}}
              </div>
            </template>
          </a-step>
        </a-steps>
      </a-row>
    </section>
  </div>
</template>

<script>
import {
  get_bid_base_info // 合同详情
} from "@admin/api/bidsContractSupply";
export default {
  components: {
    contractComponents: () => import("@admin/components/contract_component")
  },
  props:{
    father:{
      type:Object,
    }
  },
  data() {
    return {
      code: "",
      formData: {},
      stepsCurrent:1,
    };
  },
  created() {
    this.code = this.$route.query.code;
    this.get_bid_base_info_method(this.code);
    this.father.selectedKeys = ['/Scontract/get_bid_scontract_list'];
  },
  filters: {
    status: key => {
      switch (key) {
        case "1":
          return "待起草";
        case "2":
          return "待供应商确认";
        case "3":
          return "供应商已退回";
        case "4":
          return "待确认";
        case "8":
          return "已完成";
        default:
          return "未知状态";
      }
    }
  },
  methods: {
    get_bid_base_info_method(code) {
      get_bid_base_info({ code })
        .then(res => {
          var formData = res.data || [];
          this.$refs['contract'].columns_stock_list[6].children = [];
          formData.area_list.forEach(elem => {
            this.$refs['contract'].columns_stock_list[6].children.push({
              title: elem.area_name,
              dataIndex: elem.area_key,
              align: "center",
              scopedSlots: { customRender: elem.area_key },
              width: "6%"
            });
          });
          /* 插入合计列 */
          if (formData.area_list.length > 1) {
            this.$refs['contract'].columns_stock_list[6].children.push({
              title: "合计数量",
              align: "center",
              dataIndex: "number",
              width: "10%"
            });
          }
          this.stepsCurrent = formData.log_list.length;
          this.formData = formData;
        })
        .catch(error => this.$message.error(error));
    },
    showContract() {
      open(
        this.global.baseUrl +
          "?c=Pcontract&a=pre_view&code=" +
          this.formData.code
      );
    },
    downloadContract() {
      open(
        this.global.baseUrl +
          "?c=Pcontract&a=download&code=" +
          this.formData.code
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
@import '~@admin/assets/scss/steps-content';
#contract_detail {
  @include component;
  .ant-row{
    @extend .mb-10;
    .ant-col-3,.ant-col-4{
      @extend .text-right;
    }
  }
  @include step-item;
}
</style>