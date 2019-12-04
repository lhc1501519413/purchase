<template>
  <div id="bid_notice_detail">
    <section class="bid_notice_detail mt-20">
      <h4>项目公告 / 采购公告</h4>
      <div class="bigcontent">
        <h2 class="text-center mb-10">{{formData.title}}</h2>
        <h4 class="text-center mb-10">
          <span>发布时间：{{formData.create_time}}</span>
          <span class="ml-10">浏览次数：{{formData.times}}</span>
        </h4>
        <div class="text-indent-35 mb-10">{{formData.com_name}}拟对{{formData.project_name}}进行{{formData.bid_type_name}}，现将相关事项公告如下：</div>
        <h3>一、项目编号：{{formData.custom_code}}</h3>
        <h3>二、项目名称：{{formData.project_name}}</h3>
        <h3>三、采购方式：{{formData.bid_type_name}}</h3>
        <h3>四、招标商品信息</h3>
        <a-table
          class="mb-10"
          rowKey="id"
          :columns="columns"
          :dataSource="formData.stock_list"
          :pagination="pagination"
        >
          <template slot="is_exam" slot-scope="value">{{value|is_exam}}</template>
        </a-table>
        <h3>五、供应商资格要求</h3>
        <div class="text-indent-35 mb-10">{{formData.qualifications}}</div>
        <h3>六、供应商获取采购文件要求</h3>
        <div class="text-indent-35 mb-10">{{formData.qualifications}}</div>
        <h3>七、开标评标时间和地址</h3>
        <div class="text-indent-35 mb-10">{{formData.start_time}}~{{formData.end_time}}</div>
        <h3>八、投标保证金</h3>
        <div v-if="formData.is_margin==1" class="text-indent-35 mb-10">
          本次投标保证金为{{formData.margin}}元人民币（可以现金或转账支票形式），请用信封单独封好，信封封面写上投标项目名称并封口加盖投标人单位公章，并按投标文件提交的时间地点要求提交与招标人。投标人必须承诺现金和转账支票的真实有效性，否则责任自负。未中标当场退还，中标的则自动转为合同保证金，合同期满无息退还。
        </div>
        <div v-else class="text-indent-35 mb-10">
          本项目不需要投标保证金
        </div>
        <h3>九、其他事项</h3>
        <div class="text-indent-35 mb-10">{{formData.desc}}</div>
        <h3>十、联系方式</h3>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="15">采购单位：{{formData.com_name}}</a-col>
        </a-row>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="6">联系人：{{formData.contact_name}}</a-col>
          <a-col :span="6" :offset="3">联系方式：{{formData.contact_number}}</a-col>
        </a-row>
        <a-row class="text-indent-35 mb-10">
          <a-col :span="6">传真：{{formData.fax}}</a-col>
          <a-col :span="6" :offset="3">地址：{{formData.address}}</a-col>
        </a-row>
        <div class="text-right pr-20">{{formData.com_name}}</div>
        <div class="text-right pr-20">{{formData.create_time}}</div>
      </div>
    </section>
  </div>
</template>

<script>
import { get_Pbid_notice_info } from "@indexApi/common";
export default {
  data() {
    return {
      id: "",
      formData: {},
      columns: [
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
      ],
      pagination: {
        showQuickJumper: true,
        showTotal: () => {
          return `共${this.formData.stock_list.length}条数据`;
        }
      }
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.get_Pbid_notice_info_method();
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
    get_Pbid_notice_info_method() {
      get_Pbid_notice_info({ id: this.id })
        .then(res => {
          this.formData = res.data;
        })
        .catch(error => this.$message.error(error));
    }
  }
};
</script>
<style lang="scss" scoped>
#bid_notice_detail {
  width: 100%;
  height: 100%;
  .bid_notice_detail {
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
        margin-bottom: 10px;
      }
      .text-indent-35 {
        text-indent: 35px;
      }
    }
  }
}
</style>