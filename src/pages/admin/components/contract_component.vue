<template>
  <div id="contract_component">
    <a-form-item label="配送区域" :label-col="{ span:3 }" :wrapper-col="{ span:17 }">
      <a-table
        :columns="columns_area"
        :dataSource="formData.area_list"
        rowKey="area_key"
        :pagination="false"
      >
        <template slot-scope="text,record" slot="area_name">{{record.area_name}}</template>
        <template slot="region_list" slot-scope="text,record">
          <ul>
            <li v-for="item of record.region_list" :key="item.id">{{item.name}}</li>
          </ul>
        </template>
      </a-table>
    </a-form-item>
    <a-form-item label="配送要求" :label-col="{ span:3 }" :wrapper-col="{ span:17 }">
      根据合同甲方所定数量与时间（一般为订货时间起 
      <span style="color:#f00;margin:0 5px;">
        {{formData.order_times}}
      </span>
      小时内）送货。如遇合同甲方特殊情况需紧急订货的，商家应首先满足。
    </a-form-item>
    <h4 class="mt-10">商品信息</h4>
    <a-row>
      <a-col :span="6" :offset="1">采购类别：{{formData.bid_cat_name}}</a-col>
      <a-col :span="6" :offset="1">预计配送时间：{{formData.shipping_days}}天</a-col>
      <a-col :span="6" :offset="1">预估采购金额：{{formData.expert_money}}元</a-col>
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
        v-for="item of formData.area_list"
        :slot="item.area_key"
        slot-scope="text,record"
      >
        <div :key="item.area_key">{{record.area_stock_number[record.area_stock_number.indexOfObj('area_key',item.area_key)].number}}</div>
      </template>
    </a-table>
    <h4 class="mt-30">合同</h4>
    <a-row>
      <a-col :span="8" :offset="1">
        <span>合同期限：按送货量自动截止</span>
      </a-col>
    </a-row>
    <slot name="margin_money"></slot>
    <h4 class="mt-10">计算方式</h4>
    <a-row>
      <a-col :span="22" :offset="1">
        <span>货到经甲方验收合格后结算，原则上一月结算一次，隔月支付货款，如有特殊情况，必须经合同甲方同意方可提前支付货款。乙方应满足甲方在货款税务票据方面的具体要求。</span>
      </a-col>
    </a-row>
    <h4 class="mt-10">供应规定</h4>
    <a-row>
      <a-col :span="22" :offset="1">
        <p>1. 乙方按照甲方各食堂所报数量及要求，按时送到各食堂指定地点（一般为订货时间起24小时内，生鲜类、紧急订货等甲方有特定需求的须首先满足）；</p>
        <p>2. 合同期内不调价；</p>
        <p>3. 甲方要求及甲乙方约定的产品规格、技术标准和其他性状要求等作为实际配送时的验收标准，国家法律法规、标准等规定的要求作为当然验收要求。</p>
      </a-col>
    </a-row>
    <slot name="supply_sales"></slot>
  </div>
</template>

<script>
export default {
  props: ['formData'],
  data() {
    return {
      columns_area: [
        {
          title: "序号",
          customRender: (text, record, index) => `${index + 1}`,
          align: "center",
          width: "6%"
        },
        {
          title: "片区名称",
          dataIndex: "area_name",
          scopedSlots: { customRender: "area_name" },
          width: "10%"
        },
        {
          title: "配送区域",
          dataIndex: "region_list",
          scopedSlots: { customRender: "region_list" },
          width: "10%"
        }
      ], // 分区table列数组
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
          title: "产品参数",
          dataIndex: "note",
          width: "6%",
          scopedSlots: { customRender: "note" }
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
          align:'center',
          width: "6%"
        }
      ],
      pagination_shipping: {
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "30", "40"]
      },
    };
  }
};
</script>
<style lang="scss" scoped>
h4{
  border-left: 4px solid $primary2;
  @extend .pl-10;
  @extend .ml-10;
  @extend .mb-10;
}
</style>