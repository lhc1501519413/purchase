<template>
  <div id="bid">
    <h3>
      <span>
        项目编号：{{formData.custom_code}}
      </span>
      <span class="status">
        状态：{{formData.status|status}}
      </span>
    </h3>
    <section class="content">
      <h4>项目基本信息</h4>
      <a-row class="mb-10">
        <a-col class="text-right" :span='2' :offset='1'>项目名称：</a-col>
        <a-col :span='5'>{{formData.title}}</a-col>
        <a-col class="text-right" :span='2' :offset='1'>项目编号：</a-col>
        <a-col :span='5'>{{formData.custom_code}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right" :span='2' :offset='1'>采购单位：</a-col>
        <a-col :span='5'>{{formData.com_name}}</a-col>
        <a-col class="text-right" :span='2' :offset='1'>采购方式：</a-col>
        <a-col :span='5'>{{formData.bid_type_name}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right" :span='2' :offset='1'>采购联系人：</a-col>
        <a-col :span='5'>{{formData.contact_name}}</a-col>
        <a-col class="text-right" :span='2' :offset='1'>联系方式：</a-col>
        <a-col :span='5'>{{formData.contact_number}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="2" :offset='1' class="text-right">配送区域：</a-col>
        <a-col :span="11">
          <a-table
            :columns="columns_area"
            :dataSource="formData.area_list"
            rowKey="area_key"
            :pagination="false"
          >
            <template slot="region_list" slot-scope="text,record">
              <ul>
                <li v-for="item of record.region_list" :key="item.id">{{item.name}}</li>
              </ul>
            </template>
          </a-table>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="2" :offset='1' class="text-right">配送要求：</a-col>
        <a-col :span="11">
          根据合同甲方所定数量与时间（一般为订货时间起
          <span style="color:#f00;margin:0 5px;">
            {{formData.order_times}}
          </span>
          小时内）送货。如遇合同甲方特殊情况需紧急订货的，商家应首先满足。
        </a-col>
      </a-row>
    </section>
    <section class="content">
      <h4>项目商品信息</h4>
      <a-row>
        <a-col :span="6" :offset='1'>
          采购类别：{{formData.cat_name}}
        </a-col>
        <a-col :span="6" :offset='1'>
          预计配送时间：{{formData.shipping_days}}天
        </a-col>
        <a-col :span="6" :offset='1'>
          预估采购金额：{{formData.expert_money}}万元
        </a-col>
      </a-row>
      <a-table
        bordered
        class="mt-10"
        :columns="columns_stock_list"
        :dataSource="formData.stock_list"
        rowKey="stock_id"
        :pagination="pagination_shipping"
      >
      <template slot="note" slot-scope="text">
        <span class="line-wrap" :title="text">{{text}}</span>
      </template>
        <template
          v-for="(item,index2) of formData.area_list"
          :slot="item.area_key"
          slot-scope="text,record"
        >
          <div :key="index2">{{record.area_stock_number[index2].number}}</div>
        </template>
      </a-table>
    </section>
  </div>
</template>

<script>
import {
  get_bid_info // 获取详情
} from "@admin/api/bids";
export default {
  data() {
    return {
      formData: {
        id: "",
        title: "", //标题
        custom_code: "", //项目编号
        com_id: "", // 公司id
        com_code: "",
        com_name: "",
        shipping_days: "", //配送时间
        bid_type: "", // 采购方式
        bid_type_name: "",
        status: "", //项目单状态
        cat_id: "", //大类ID
        cat_name: "",
        region_id: "", //价格区域ID
        region_name: "",
        area_list: [], // 区域列表
        contact_name: "", // 联系人
        contact_number: "", // 联系方式
        stock_list: []
      },
      columns_stock_list: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          align: "center",
          width: "6%"
        },
        {
          title: "商品名称",
          dataIndex: "stock_name",
          width: "10%"
        },
        {
          title: "品牌",
          dataIndex: "brand_name",
          width: "6%"
        },
        {
          title: "规格",
          dataIndex: "standard",
          width: "6%"
        },
        {
          title:'产品参数',
          dataIndex:'note',
          width:'6%',
          scopedSlots:{ customRender:'note' }
        },
        {
          title: "采购单位",
          dataIndex: "price_unit_name",
          width: "6%"
        },
        {
          title: "预估采购数量",
          children: [],
          width: "50%"
        },
        {
          title: "单价（元）",
          dataIndex: "price",
          width: "6%"
        }
      ],
      columns_area: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          align: "center",
          width: "10%"
        },
        {
          title: "片区名称",
          dataIndex: "area_name",
          width:'40%'
        },
        {
          title: "配送区域",
          dataIndex: "region_list",
          scopedSlots: { customRender: "region_list" },
          width:'50%'
        }
      ], // 分区table列数组
      pagination_shipping: {
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"]
      }
    };
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '1':
          return '待提交'
        case '2':
          return '待审核'
        case '3':
          return '项目已驳回'
        case '8':
          return '采购文件待制作'
        case '9':
          return '采购文件待审核'
        case '10':
          return '采购文件已驳回'
        case '11':
          return '采购公告已发布'
        case '15':
          return '待开标'
        case '16':
          return '评标中'
        case '17':
          return '采购人确认中'
        case '18':
          return '采购结果公告已发布'
        case '20':
          return '已流标'
        case '21':
          return '已流标'
        default:
          return '未知状态'
      }
    }
  },
  created() {
    var id = this.$route.query.id;
    id && this.get_bid_info_method(id);
  },
  methods: {
    get_bid_info_method(id) {
      // 修改项目时获取信息
      get_bid_info(id)
        .then(res => {
          var formData = res.data || [];
          this.columns_stock_list[6].children = [];
          formData.area_list.forEach(elem => {
            this.columns_stock_list[6].children.push({
              title: elem.area_name,
              dataIndex: elem.area_key,
              align: "center",
              scopedSlots: { customRender: elem.area_key },
              width: "6%"
            });
          });
          /* 插入合计列 */
          if(formData.area_list.length>1){
            this.columns_stock_list[6].children.push({
              title:'合计数量',
              align:'center',
              dataIndex:'number',
              width:'6%'
            })
          }
          this.formData = formData;
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
#bid {
  width: 100% !important;
  @include component;
  .line-wrap{
    @extend .mult-line-ellipsis;
    -webkit-line-clamp: 2;
  }
}
</style>