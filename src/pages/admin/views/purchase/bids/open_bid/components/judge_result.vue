<template>
  <div class="judge_result">
    <section class="content">
      <h4>得分汇总列表</h4>
      <a-table class="table" :dataSource="judge_result" :columns="columns" rowKey="supply_id" :rowSelection="rowSelection">
        <template slot="is_agree_price" slot-scope="text,record">
          <a-radio-group 
            :disabled="status>=14"
            v-model="record.is_agree_price">
            <a-radio :style="radioStyle" :value="'1'">是</a-radio>
            <a-radio :style="radioStyle" :value="'2'">否</a-radio>
          </a-radio-group>
        </template>
      </a-table>
      <h4>评审意见</h4>
      <div class="ml-20 mb-10" v-for="item of opinion_list" :key='item.user_id'>
        【{{item.realname}}】评审意见：{{item.opinion}}
      </div>
      <h4>其他</h4>
      <a-row>
        <a-col :span="3" class="text-right">比较和评价：</a-col>
        <a-col :span="13">{{opinion}}</a-col>
      </a-row>
    </section>
    <a-modal
      class="compute-price"
      :destroyOnClose="true"
      style="top: 3%;"
      width="70%"
      :visible="ModalVisible"
      :maskClosable="false"
      :footer="null"
      @ok="ModalVisible = false"
      @cancel="ModalVisible = false"
      >
      <h3 class="text-center" slot="title">计算中标价格</h3>
      <section class="content">
      <h4>项目基本信息</h4>
      <a-row class="mb-10">
        <a-col class="text-right" :span='2' :offset='1'>项目名称：</a-col>
        <a-col :span='5'>{{bid_pre_price_info.title}}</a-col>
        <a-col class="text-right" :span='2' :offset='1'>项目编号：</a-col>
        <a-col :span='5'>{{bid_pre_price_info.custom_code}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right" :span='2' :offset='1'>采购单位：</a-col>
        <a-col :span='5'>{{bid_pre_price_info.com_name}}</a-col>
        <a-col class="text-right" :span='2' :offset='1'>采购方式：</a-col>
        <a-col :span='5'>{{bid_pre_price_info.bid_type_name}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col class="text-right" :span='2' :offset='1'>采购联系人：</a-col>
        <a-col :span='5'>{{bid_pre_price_info.contact_name}}</a-col>
        <a-col class="text-right" :span='2' :offset='1'>联系方式：</a-col>
        <a-col :span='5'>{{bid_pre_price_info.contact_number}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span="2" :offset='1' class="text-right">配送区域：</a-col>
        <a-col :span="11">
          <a-table
            :columns="columns_area"
            :dataSource="bid_pre_price_info.area_list"
            rowKey="area_key"
            :pagination="false"
          >
            <template slot="region_list" slot-scope="text,record">
              <ul>
                <li v-for="item of record.region_list" :key="item.id">{{item.name}}，</li>
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
            {{bid_pre_price_info.order_times}}
          </span>
          小时内）送货。如遇合同甲方特殊情况需紧急订货的，商家应首先满足。
        </a-col>
      </a-row>
    </section>
    <section class="content">
      <h4>项目商品信息</h4>
      <a-row>
        <a-col :span="6" :offset='1'>
          采购类别：{{bid_pre_price_info.cat_name}}
        </a-col>
        <a-col :span="6" :offset='1'>
          预计配送时间：{{bid_pre_price_info.shipping_days}}天
        </a-col>
        <a-col :span="6" :offset='1'>
          预估采购金额：{{bid_pre_price_info.expert_money}}万元
        </a-col>
      </a-row>
      <a-table
        bordered
        class="mt-10"
        :columns="columns_stock_list"
        :dataSource="bid_pre_price_info.stock_list"
        rowKey="stock_id"
        :pagination="false"
        :scroll='{
          y:600
        }'
      >
        <template
          v-for="(item,index2) of bid_pre_price_info.area_list"
          :slot="item.area_key"
          slot-scope="text,record"
        >
          <div :key="index2">{{record.area_stock_number[index2].number}}</div>
        </template>
      </a-table>
    </section>
    </a-modal>
  </div>
</template>

<script>
import {
  get_judge_result, // 获取商务技术评分汇总
  confirm_bid_judge, // 得分汇总下一步
  submit_supply_price_status, // 提交供应商关于价格意见
  get_bid_pre_price_info
} from "@admin/api/open_bid";
export default {
  props: {
    father: {
      type: Object
    }
  },
  data() {
    return {
      priv: this.$store.getters.priv,
      bid_code: this.$route.query.bid_code,
      status:this.$store.getters.judgeStatus,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      judge_result: [],
      opinion:'',
      opinion_list:[],
      columns: [
        {
          title: "供应商名称",
          dataIndex:'supply_name',
          width: "20%",
        },
        {
          title: "最终报价（元）",
          dataIndex:'report_money',
          width: "10%",
        },
        {
          title: "报价得分",
          dataIndex:'report_score',
          width: "10%",
        },
        {
          title: "技术商务资质信得分",
          dataIndex:'business_skill_score',
          width: "15%",
        },
        {
          title: "总得分",
          dataIndex:'total_score',
          width: "10%",
        },
        {
          title: "排名",
          dataIndex:'rank',
          width: "10%",
        },
        {
          title:'是否同意',
          dataIndex:'is_agree_price',
          width:'10%',
          scopedSlots:{ customRender:'is_agree_price' }
        }
      ],
      selectedRowKeys:[],
      ModalVisible:false,
      bid_pre_price_info:{},
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
          width:'6%'
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
  computed:{
    rowSelection(){
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        columnTitle:'推荐中标',
        getCheckboxProps: record => ({
            props: {
              disabled: true,
            }
          }),
      }
    }
  },
  created() {
    this.father.current = 8;
    this.refresh();
  },
  methods: {
    refresh() {
      get_judge_result(this.bid_code)
        .then(res => {
          this.judge_result = res.data.supply_list||[];
          this.opinion_list = res.data.opinion_list||[];
          this.opinion = res.data.opinion||'';
          var supply_list = res.data.supply_list||[];
          supply_list.forEach(elem=>{
            if(elem.is_elect==1)this.selectedRowKeys.push(elem.supply_id)
          })
        })
        .catch(error => this.$message.error(error));
    },
    compute_bid_price(){
      get_bid_pre_price_info({bid_code:this.bid_code}).then(res=>{
        var bid_pre_price_info = res.data || [];
        this.columns_stock_list[6].children = [];
        bid_pre_price_info.area_list.forEach(elem => {
          this.columns_stock_list[6].children.push({
            title: elem.area_name,
            dataIndex: elem.area_key,
            align: "center",
            scopedSlots: { customRender: elem.area_key },
            width: "6%"
          });
        });
        /* 插入合计列 */
        if(bid_pre_price_info.area_list.length>1){
          this.columns_stock_list[6].children.push({
            title:'合计数量',
            align:'center',
            dataIndex:'number',
            width:'6%'
          })
        }
        this.bid_pre_price_info = bid_pre_price_info;
        this.ModalVisible = true;
      })
      .catch(error => this.$message.error(error));
    },
    submit(){
      submit_supply_price_status({
        bid_code:this.bid_code,
        supply_list:this.judge_result
      }).then(res=> this.$message.success(res.msg))
      .catch(error => this.$message.error(error));
    },
    next() {
      if(this.$store.getters.judgeStatus>=15){ // 得分汇总完成
        this.$router.push({path:'/Bid/judge_elect_supply',query:{bid_code:this.bid_code}})
      }else{
        confirm_bid_judge({bid_code:this.bid_code}).then(res => {
          this.$router.push({path:'/Bid/judge_elect_supply',query:{bid_code:this.bid_code}})
        }).catch(error => this.$message.error(error));
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/content";
.judge_result {
  @include content;
}
</style>
<style lang="scss">
.compute-price {
  h4 {
    border-left: 4px solid $primary2;
    @extend .pl-10;
    @extend .ml-40;
    @extend .mb-10;
  }
}
</style>
