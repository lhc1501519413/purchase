<template>
  <div id="noticeDetail">
    <section class="noticeDetail mt-20">
      <h4>在线询价 / 询价结果 / 询价结果详情</h4>
      <div class="bigcontent">
        <h3 class="text-center">关于{{formData.title}}{{formData.status==8?'询价的在线询价成交公告':'询价的在线询价中止公告'}}</h3>
        <section class="content">
          <h4>询价基本信息</h4>
          <a-row>
            <a-col :span="3" :offset="1">询价单编号：</a-col>
            <a-col :span="6">{{formData.code}}</a-col>
            <a-col :span="3" :offset="1">询价单位：</a-col>
            <a-col :span="6">{{formData.com_name}}</a-col>
          </a-row>
          <a-row>
            <a-col :span="3" :offset="1">报价时间：</a-col>
            <a-col :span="6">{{formData.start_date}} ~ {{formData.end_date}}</a-col>
            <a-col :span="3" :offset="1">联系人：</a-col>
            <a-col :span="6">{{formData.contact_name}}</a-col>
          </a-row>
          <a-row>
            <a-col :span="3" :offset="1">联系方式：</a-col>
            <a-col :span="6">{{formData.contact_number}}</a-col>
            <a-col :span="3" :offset="1">成交规则：</a-col>
            <a-col :span="6">{{formData.rule_type_name}}</a-col>
          </a-row>
          <a-row>
            <a-col :span="3" :offset="1">供应商要求：</a-col>
            <a-col :span="8">{{formData.remark}}</a-col>
          </a-row>
          <a-row>
            <a-col :span="3" :offset="1">配送区域：</a-col>
            <a-col :span="8">{{region_area}}</a-col>
          </a-row>
          <a-row>
            <a-col :span="3" :offset="1">配送要求：</a-col>
            <a-col :span="8">{{formData.shipping_remark}}</a-col>
          </a-row>
        </section>
        <section class="content">
          <h4>询价商品信息</h4>
          <a-row>
            <a-col :span="6" :offset="1">询价大类：{{formData.cat_name}}</a-col>
            <a-col :span="8">预计配送时间：{{formData.end_days}}天</a-col>
          </a-row>
          <a-table
            rowKey="id"
            :columns="columns"
            :dataSource="formData.stock_list"
            :pagination="pagination"
          >
            <template slot="is_exam" slot-scope="value">{{value|is_exam}}</template>
          </a-table>
        </section>
        <section class="content" v-if="win_supply_info.supply_id">
          <h4>成交结果信息</h4>
          <a-row>
            <a-col :span="10" :offset="1">
              <p class="mt">中标供应商：{{formData.win_supply_info.supply_name}}</p>
              <p class="mt">成交总价：{{formData.win_supply_info.total_money}}元</p>
              <p class="mt">报价时间：{{formData.win_supply_info.report_time}}</p>
            </a-col>
          </a-row>
          <a-table
            bordered
            :columns="columns3"
            :dataSource="formData.win_supply_info.stock_list"
            rowKey="stock_id"
            class="mt"
          ></a-table>
        </section>
        <section class="content" v-else>
          <h4>询价结果</h4>
          <a-row>
            <a-col :span='10' :offset='1'>
              <span>
                询价结果：取消询价
              </span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span='7' :offset='1'>理由说明：{{formData.memo}}</a-col>
          </a-row>
        </section>
        <section class="content">
          <h4>参与报价供应商情况</h4>
          <a-table
            bordered
            :columns="columns2"
            :dataSource="formData.report_supply_list"
            rowKey="supply_id"
          ></a-table>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { get_inquiry_base_info } from "@indexApi/common";
const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => `${index + 1}`,
    width: "14%",
    align: "center"
  },
  {
    title: "商品名称",
    dataIndex: "stock_name",
    width: "14%",
    align: "center"
  },
  {
    title: "品牌",
    dataIndex: "brand",
    width: "14%",
    align: "center"
  },
  {
    title: "规格",
    dataIndex: "standard",
    width: "14%",
    align: "center"
  },
  {
    title: "采购单位",
    dataIndex: "price_unit_name",
    width: "14%",
    align: "center"
  },
  {
    title: "预估采购数量",
    dataIndex: "number",
    width: "14%",
    align: "center"
  },
  {
    title: "提供产品检测报告",
    dataIndex: "is_exam",
    width: "14%",
    align: "center",
    scopedSlots: { customRender: "is_exam" }
  }
];
const columns2 = [
  {
    title: "序号",
    customRender: (text, record, index) => `${index + 1}`,
    width: "20%",
    align: "center"
  },
  {
    title: "供应商名称",
    width: "25%",
    dataIndex: "supply_name",
    align: "center"
  },
  {
    title: "报价时间",
    width: "20%",
    dataIndex: "report_time",
    align: "center"
  }
];
const columns3 = [
  {
    title: "序号",
    customRender: (text, record, index) => `${index + 1}`,
    width: "5%",
    align: "center"
  },
  {
    title: "商品名称",
    dataIndex: "stock_name",
    width: "7%",
    align: "center"
  },
  {
    title: "品牌",
    dataIndex: "response_brand",
    width: "5%",
    align: "center"
  },
  {
    title: "规格",
    dataIndex: "response_standard",
    width: "6%",
    align: "center"
  },
  {
    title: "采购单位",
    dataIndex: "price_unit_name",
    width: "6%",
    align: "center"
  },
  {
    title: "预估采购数量",
    dataIndex: "number",
    width: "8%",
    align: "center"
  },
  {
    title: "单价（元）",
    dataIndex: "price",
    width: "9%",
    align: "center",
    scopedSlots: { customRender: "price" }
  }
];
export default {
  data() {
    return {
      columns,
      columns2,
      columns3,
      inquiry_code:'',
      formData: {},
      win_supply_info:{},
      region_area: "",
      pagination: {
        showQuickJumper: true,
        showTotal: () => {
          return `共${this.formData.stock_list.length}条数据`;
        }
      }
    };
  },
  created() {
    this.inquiry_code = this.$route.query.inquiry_code;
    this.get_inquiry_base_info_method()
  },
  filters: {
    is_exam(key) {
      switch (key) {
        case 1:
          return "是";
          break;
        case "1":
          return "是";
          break;
        default:
          return "否";
          break;
      }
    }
  },
  methods: {
    get_inquiry_base_info_method(){
      get_inquiry_base_info({inquiry_code:this.inquiry_code}).then(res=>{
        this.formData = res.data;
        this.win_supply_info = res.data.win_supply_info;
        this.get_region_area();
      }).catch()
    },
    get_region_area() {
      var list = this.formData.shipping_region_list;
      var region_area = "";
      list.forEach(elem => {
        region_area += elem.name + "，";
      });
      this.region_area = region_area.slice(0, -1);
    }
  }
};
</script>
<style lang="scss" scoped>
#noticeDetail {
  width: 100%;
  height: 100%;
  .noticeDetail {
    width: 100%;
    padding: 0 17.5%;
    & > h4 {
      margin: 8px 0;
      height: 19px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      opacity: 1;
    }
    .bigcontent {
      background-color: $white;
      padding: 30px;
      h3 {
        height: 23px;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 26px;
        color: rgba(0, 0, 0, 0.85);
        opacity: 1;
      }
      .content {
        @extend .mt-20;
        h4 {
          @extend .mb-10;
          font-weight: bold;
        }
        .ant-row {
          @extend .mb-10;
        }
        .ant-col-3 {
          @extend .text-center;
        }
      }
    }
  }
}
</style>