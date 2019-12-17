<template>
  <div id="tenderDoc">
    <h5>投标管理 / 查看投标文件</h5>
    <section class="content">
      <h4>商品信息</h4>
      <a-row>
        <a-col :span="6" :offset="1">采购类别：{{formData.bid_info.cat_name}}</a-col>
        <a-col :span="8">预计配送时间：{{formData.bid_info.shipping_days}}天</a-col>
      </a-row>
      <a-table
        bordered
        class="mt-10 ml-10"
        rowKey="id"
        :columns="columnsStock"
        :dataSource="formData.stock_list"
        :pagination="paginationStock"
      >
        <template v-for="(item,index2) of formData.bid_info.area_list" :slot="String(item.area_key)" slot-scope="text,record">
          <span :key='index2'>
          {{record.area_stock_number[index2].number}}
          </span>
        </template>
        <template slot="price" slot-scope="value,record">
          {{record.new_price}}
        </template>
        <template slot="is_match" slot-scope="text,record">
          <a-select style="width: 100px"
            disabled
            :value="record.is_match"
          >
            <a-select-option disabled value="">请选择偏离信息</a-select-option>
            <a-select-option value="1">正偏离</a-select-option>
            <a-select-option value="0">无偏离</a-select-option>
            <a-select-option value="-1">负偏离</a-select-option>
          </a-select>
        </template>
      </a-table>
      <h4>资格审查要求</h4>
      <a-table
        v-if="formData.quality_info&&formData.quality_info.length>0"
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
              <!-- <a  class="ml-10" :href="item.full_path" target="_blank">{{item.file_name}}</a> -->
              <span class="ml-10">{{item.file_name}}</span>
            </li>
          </ul>
        </template>
      </a-table>
      <div class="ml-20 mb-10" v-else>
        本次招标资格审查已在供应商入驻环节完成
      </div>
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
              <!-- <a class="ml-10" :href="item.full_path" target="_blank">{{item.file_name}}</a> -->
              <span class="ml-10">{{item.file_name}}</span>
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
            <!-- <a class="ml-10" :href="item.full_path" target="_blank">下载投标文件</a> -->
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
            <!-- <a class="ml-10" :href="item.full_path" target="_blank">下载投标文件</a> -->
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
import { encryptAes, decryptAes, } from '@common/js/des';
import { encryption } from "@/common/js/ESign";
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
          title: "产品参数",
          dataIndex: "note",
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
          align: "center",
          children:[]
        },
        {
          title: "单价（元）",
          dataIndex: "price",
          width: "8%",
          align: "center",
          scopedSlots: { customRender: "price" }
        },
        {
          title: "响应品牌",
          dataIndex: "response_brand",
          width: 100,
          align: "center",
        },
        {
          title: "响应规格",
          dataIndex: "response_standard",
          width: 100,
          align: "center",
        },
        {
          title: "响应产品参数",
          dataIndex: "response_note",
          width: 100,
          align: "center",
        },
        {
          title: "偏离信息",
          dataIndex: "is_match",
          width: "15%",
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
          width: "14%",
          scopedSlots: { customRender: "name" }
        },
        {
          slots: { title: "judge_standardTitle" },
          dataIndex: "judge_standard",
          width: "40%",
          scopedSlots: { customRender: "judge_standard" }
        },
        {
          slots: { title: "gistTitle" },
          dataIndex: "gist",
          width: "12%",
          scopedSlots: { customRender: "gist" }
        },
        {
          slots: { title: "max_scoreTitle" },
          dataIndex: "max_score",
          width: "10%",
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
      },
    };
  },
  filters:{
    is_match(key){
      switch (key) {
        case '1':
          return '正偏离'
        case '0':
          return '无偏离'
        case '-1':
          return '负偏离'
        default:
          return '未知状态'
          break;
      }
    }
  },
  created() {
    this.bid_code = this.$route.query.code;
    this.father.selectedKeys = ["/Sbid/tender_list"];
    get_tender_info(this.bid_code)
      .then(res => {
        var formData = res.data || {};
        var columns=[];
        formData.bid_info.area_list.forEach(elem=>{
          this.columnsStock[6].children.push({
            title:elem.area_name,
            dataIndex:elem.area_key,
            scopedSlots:{ customRender:elem.area_key },
            width:'6%',
            align:'center'
          })
        })
        if(formData.bid_info.area_list.length>1){
          this.columnsStock[6].children.push({
            title:'合计数量',
            dataIndex:'number',
            width:'6%',
            align:'center'
          })
        }
        /* 候选是否设置 */
        formData.stock_list.forEach(elem=> elem.new_price = elem.secret_price==''?'':'***')
        encryption({
          serverName: "{0DADE507-64D6-4306-956A-2ED144FF0ED1}",
          funcName: "DecryptDigitalEnvelope",
          param: `{"digitalEnvelopeB64":"${formData.bid_info.secret}"}`
        }).then(res => {
          if (res.data.result != "") {
            var secret = res.data.result.slice(0,16);
            formData.stock_list.forEach(elem=>{
              elem.new_price = this.$common.toDecimal(decryptAes(elem.secret_price,secret),2)
            })
          } else {
            this.$message.warn("请检查是否插入U盾");
          }
        }).catch(error=> this.$message.error(error))
        this.formData = formData;
      })
      .catch(error => {
        this.$message.error(error);
      });
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