<template>
  <div id="tenderDoc">
    <h5>投标管理 / 查看投标文件</h5>
    <section class="content">
      <h4>询价商品信息</h4>
      <a-row>
        <a-col :span="6" :offset="1">采购类别：{{formData.bid_info.cat_name}}</a-col>
        <a-col :span="8">预计配送时间：{{formData.bid_info.shipping_days}}天</a-col>
      </a-row>
      <a-table
        class="mt-10 ml-10"
        rowKey="id"
        :columns="columnsStock"
        :dataSource="formData.stock_list"
        :pagination="paginationStock"
      >
        <template slot="is_match" slot-scope="value">{{value=='1'?'是':'否'}}</template>
      </a-table>
      <h4>资格审查要求</h4>
      <a-table
        class="mt-10 ml-10"
        :pagination="pagination_quality_info"
        bordered
        :dataSource="formData.quality_info"
        :columns="columns_quality_info"
        rowKey="id"
      >
        <span slot="nameTitle">
          <img class="img_point" :src="point" alt="必填" />
          审查内容
        </span>
        <template slot="operation" slot-scope="text, record">
          <ul>
            <li class="mt-10" v-for="(item,index) of record.file_list" :key="index">
              <svg-icon class="wenjian" icon-class="wenjian" />
              <a  class="ml-10" :href="item.full_path" target="_blank">{{item.file_name}}</a>
            </li>
          </ul>
        </template>
      </a-table>
      <h4>资格评分要求</h4>
      <a-table
        class="mt-10 ml-10"
        :pagination="pagination_quality_grade"
        bordered
        :dataSource="formData.quality_grade_info"
        :columns="columns_quality_grade"
        rowKey="id"
      >
        <span slot="nameTitle">
          <img class="img_point" :src="point" alt="必填" />
          评分项目
        </span>
        <span slot="judge_standardTitle">
          <img class="img_point" :src="point" alt="必填" />
          评分标准
        </span>
        <span slot="gistTitle">
          <img class="img_point" :src="point" alt="必填" />
          判定依据
        </span>
        <span slot="max_scoreTitle">
          <img class="img_point" :src="point" alt="必填" />
          最高得分
        </span>
        <template slot="operation" slot-scope="text, record">
          <ul>
            <li class="mt-10" v-for="(item,index) of record.file_list" :key="index">
              <svg-icon class="wenjian" icon-class="wenjian" />
              <a class="ml-10" :href="item.full_path" target="_blank">{{item.file_name}}</a>
            </li>
          </ul>
        </template>
      </a-table>
      <h4>项目附件</h4>
      <div class="mt-10 ml-10">
        <img class="img_point mr-10" :src="point" alt="必填" />商务技术文件
        <br />
        <ul class="ml-10">
          <li
            class="mt-10"
            v-for="(item,index) of formData.tender_file.file_list"
            :key="index"
          >
            <svg-icon class="wenjian" icon-class="wenjian" />
            <span class="ml-10">{{item.file_name}}</span>
            <a class="ml-10" :href="item.full_path" target="_blank">下载投标文件</a>
          </li>
        </ul>
      </div>
      <div class="mt-10 ml-10">
        <img class="img_point mr-10" :src="point" alt="必填" />价格文件
        <br />
        <ul class="ml-10">
          <li
            class="mt-10"
            v-for="(item,index) of formData.tender_file.price_file_list"
            :key="index"
          >
            <svg-icon class="wenjian" icon-class="wenjian" />
            <span class="ml-10">{{item.file_name}}</span>
            <a class="ml-10" :href="item.full_path" target="_blank">下载投标文件</a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import {
  get_tender_info // 获取采购文件全部详情
} from "@admin/api/bidsSupply";
export default {
  props: {
    father: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      bid_code: "",
      del_icon: require("@static/icon/icon_close.png"),
      formData: {
        bid_info: {
          id: "",
          title: "",
          custom_code: "",
          code: "",
          com_code: "",
          com_name: "",
          com_id: "",
          shipping_days: "",
          bid_type: "",
          status: "",
          cat_id: "",
          cat_name: "",
          region_id: "",
          supply_id: "",
          total_number: "",
          total_money: "",
          contact_name: "",
          contact_number: "",
          supply_count: "",
          memo: null,
          is_del: "",
          create_time: "",
          update_time: "",
          bid_type_name: "",
          region_name: "",
          shipping_region_list: []
        },
        stock_list: [],
        quality_info: [],
        quality_grade_info: [],
        tender_file: false,
        price_file: false
      },
      point: require("@static/images/icon_point.png"),
      columnsStock: [
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
          dataIndex: "brand",
          width: "5%",
          align: "center"
        },
        {
          title: "规格",
          dataIndex: "standard",
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
          align: "center"
        },
        {
          title: "响应品牌",
          dataIndex: "response_brand",
          width: "9%",
          align: "center"
        },
        {
          title: "响应规格",
          dataIndex: "response_standard",
          width: "9%",
          align: "center"
        },
        {
          title: "是否符合",
          dataIndex: "is_match",
          width: "8%",
          align: "center",
          scopedSlots: { customRender: "is_match" }
        }
      ],
      paginationStock: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.stock_list && this.formData.stock_list.length) || 0;
          return `共${length}条数据`;
        }
      },
      columns_quality_info: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          slots: { title: "nameTitle" },
          dataIndex: "name",
          width: "18%"
        },
        {
          title: "具备的条件说明（要求）",
          dataIndex: "desc",
          width: "25%"
        },
        {
          title: "判定依据",
          dataIndex: "gist",
          width: "18%"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      pagination_quality_info: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.quality_info && this.formData.quality_info.length) ||
            0;
          return `共${length}条数据`;
        }
      },
      columns_quality_grade: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          width: "6%",
          align: "center"
        },
        {
          slots: { title: "nameTitle" },
          dataIndex: "name",
          width: "18%",
          scopedSlots: { customRender: "name" }
        },
        {
          slots: { title: "judge_standardTitle" },
          dataIndex: "judge_standard",
          width: "18%",
          scopedSlots: { customRender: "judge_standard" }
        },
        {
          slots: { title: "gistTitle" },
          dataIndex: "gist",
          width: "18%",
          scopedSlots: { customRender: "gist" }
        },
        {
          slots: { title: "max_scoreTitle" },
          dataIndex: "max_score",
          width: "13%",
          scopedSlots: { customRender: "max_score" }
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ],
      pagination_quality_grade: {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        showTotal: () => {
          let length =
            (this.formData.quality_grade_info &&
              this.formData.quality_grade_info.length) ||
            0;
          return `共${length}条数据`;
        }
      }
    };
  },
  created() {
    this.bid_code = this.$route.query.code;
    this.father.selectedKeys = ["/Sbid/tender_list"];
    get_tender_info(this.bid_code)
      .then(res => {
        this.formData = res.data;
        this.formData.tender_file = res.data.tender_file || [];
      })
      .catch(error => {
        this.$message.error(error);
      });
  },
  methods: {
    downloadFile(e){
      open(e.target.dataset.fullpath)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/common";
#tenderDoc {
  @include component;
  .img_point {
    width: 8px;
    height: 8px;
    margin-bottom: 3px;
  }
  .wenjian {
    width: 17px;
    height: 17px;
  }
}
</style>