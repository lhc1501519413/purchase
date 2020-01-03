<template>
  <div id="scrap">
    <h5>
      <div>开标评标管理 / 废标信息</div>
      <div>
        <a-button class="mr-10" @click="$router.go(-1)">返回</a-button>
        <a-button class="ml-10" type='primary' @click="scrap_supply_list">刷新</a-button>
      </div>
    </h5>
    <a-table
      class="content"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="false"
      rowKey="supply_id"
    >
      <template slot="is_scrap_step" slot-scope="value">
        <span>{{value>0?'已废标':'未废标'}}</span>
      </template>
      <template slot="operation" slot-scope="text,record">
        <a v-if="record.is_record==1" @click="scrap_record(record.supply_id)">废标记录</a>
      </template>
    </a-table>
    <a-modal
      class="scrap-modal"
      :destroyOnClose="true"
      style="top: 5%;"
      width="55%"
      :visible="ModalVisible"
      :keyboard="false"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
    >
      <h3 slot="title">废标记录</h3>
      <div class="text-right">
        <a-button type='primary' @click="print_scrap">打印废标记录</a-button>
      </div>
      <ul id="scrap-record">
        <li v-for="(item,index) of scrap_list" :key="index" class="p-10">
          <h3>
            <span>
              废标记录（{{index+1}}）
            </span>
            <span class="ml-20">
              发起时间：{{item.create_time}}
            </span>
          </h3>
          <a-row class="mb-10 mt-10">
            <a-col :span="22" :offset="1">供应商名称：{{item.supply_name}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="22" :offset="1">状态：{{item.status|status}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="22" :offset="1">废标节点：{{item.step_name}}</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="22" :offset="1">关于参与基准值单位设定：废标单位不参与基准值计算</a-col>
          </a-row>
          <a-row class="mb-10">
            <a-col :span="22" :offset="1">废标原因：{{item.reason}}</a-col>
          </a-row>
          <a-table
            :dataSource="item.record_list"
            :columns="columns2"
            :pagination="false"
            rowKey="user_id"
          >
          <template slot="status" slot-scope='value'>
            {{value==1?'同意':'不同意'}}
          </template>
          </a-table>
        </li>
      </ul>
    </a-modal>
  </div>
</template>
<script>
import {
  scrap_supply_list, // 废标供应商列表
  get_scrap_list, // 获取废标记录
} from "@admin/api/open_bid";
import { getLodop } from '@common/js/lodop';
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      bid_code: this.$route.query.bid_code,
      dataSource: [],
      columns: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          title: "单位名称",
          dataIndex: "supply_name",
          width: "10%"
        },
        {
          title: "状态",
          dataIndex: "is_scrap_step",
          scopedSlots: { customRender: "is_scrap_step" },
          width: "10%"
        },
        {
          title: "操作",
          scopedSlots: { customRender: "operation" },
          width: "15%"
        }
      ],
      ModalVisible: false,
      scrap_list: [],
      columns2: [
        {
          title: "专家姓名",
          dataIndex: "username",
          width: "10%"
        },
        {
          title: "是否同意",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          width: "10%"
        },
        {
          title: "专家意见",
          dataIndex: "opinion",
          width: "15%"
        }
      ]
    };
  },
  filters: {
    status(key) {
      switch (key) {
        case "0":
          return "未废标";
          break;
        case "1":
          return "已取消";
          break;
        case "2":
          return "已达成废标";
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.scrap_supply_list();
    this.father.selectedKeys = ["/Bid/open_bid_list"];
  },
  methods: {
    scrap_supply_list() {
      scrap_supply_list({bid_code:this.bid_code})
        .then(res => {
          this.dataSource = res.data || [];
        })
        .catch(error => this.$message.error(error));
    },
    scrap_record(supply_id) {
      get_scrap_list({ bid_code: this.bid_code, supply_id })
        .then(res => {
          this.ModalVisible = true;
          this.scrap_list = res.data || [];
        })
        .catch(error => this.$message.error(error));
    },
    print_scrap(){
      var LODOP=getLodop();
      if(!LODOP) return;
      LODOP.PRINT_INIT();
      var strFormHtml = document.querySelector('#scrap-record').outerHTML;
      var strBodyStyle=`
      <style>
      table,td,th { border: 1 solid #000000;border-collapse:collapse;text-align: center }
      ul{list-style: none;}.ant-row{margin-bottom:10px}
      </style>`;
      LODOP.ADD_PRINT_HTM('15mm','10mm',"RightMargin:9mm","BottomMargin:9mm",strFormHtml+strBodyStyle);
      LODOP.PREVIEW();
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#scrap {
  @include component;
}
</style>
<style lang="scss">
.scrap-modal {
  width: 100%;
  .row {
    @include flex(flex-start, flex-start);
    @extend .mb-10;
    .ant-input {
      @extend .pl-10;
      width: 70%;
    }
  }
}
</style>