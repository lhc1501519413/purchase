<template>
  <div id="offer">
    <h5>
        <span>在线询价 / 询价单管理 / 公告详情</span>
        <div></div>
    </h5>
    <enquiry :formData="formData" :region_area='region_area'></enquiry>
     <section class="content">
      <h4>询价商品信息</h4>
      <a-row>
        <a-col :span='6' :offset='1'>询价大类：{{formData.cat_name}}</a-col>
        <a-col :span='8'>预计配送时间：{{formData.shipping_days}}天</a-col>
      </a-row>
      <a-table 
        bordered
        class="table"
        rowKey="id"
        :columns="columns"
        :dataSource="data"
        :pagination='pagination'
      >
      <template slot="is_match" slot-scope="value,record">
        {{record.is_match|is_exam}}
      </template>
      <template slot="is_exam" slot-scope="value">
        {{value|is_exam}}
      </template>
      </a-table>
    </section>
    <section class="content" v-if="win_supply_info.supply_id">
      <h4>成交结果信息</h4>
      <a-row>
        <a-col :span='10' :offset='1'>
          <p class="mt">中标供应商：{{win_supply_info.supply_name}}</p>
          <p class="mt">成交总价：{{win_supply_info.total_money}}元</p>
          <p class="mt">报价时间：{{win_supply_info.report_time}}</p>
        </a-col>
      </a-row>
      <a-table bordered :columns="columns3" :dataSource="win_supply_info.stock_list" rowKey='stock_id' class="mt"></a-table>
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
      <a-table bordered :columns="columns2" :dataSource="formData.report_supply_list" rowKey='supply_id'></a-table>
    </section>
  </div>
</template>

<script>
import enquiry from '@admin/components/noticeList';
import {
  get_inquiry_base_info, // 公告详情
} from '@common/js/comUsedApi';
const columns = [
  {
    title:'序号',
    customRender: (text,record,index)=>`${index+1}`,
    width:'5%',
    align:'center'
  },
  {
    title:'商品名称',
    dataIndex: 'stock_name',
    width:'7%',
    align:'center'
  },
  {
    title:'品牌',
    dataIndex: 'brand',
    width:'5%',
    align:'center'
  },
  {
    title:'规格',
    dataIndex: 'standard',
    width:'6%',
    align:'center'
  },
  {
    title:'采购单位',
    dataIndex: 'price_unit_name',
    width:'6%',
    align:'center'
  },
  {
    title:'预估采购数量',
    dataIndex: 'number',
    width:'8%',
    align:'center'
  },
  {
    title:'提供产品检测报告',
    dataIndex: 'is_exam',
    width:'8%',
    align:'center',
    scopedSlots: { customRender: 'is_exam' }
  }
];
const columns2 = [
  {
    title:'序号',
    customRender: (text,record,index)=>`${index+1}`,
    width:'20%',
    align:'center'
  },
  {
    title:'供应商名称',
    width:'25%',
    dataIndex: 'supply_name',
    align:'center'
  },
  {
    title:'报价时间',
    width:'20%',
    dataIndex: 'report_time',
    align:'center'
  }
];
const columns3 = [
  {
    title:'序号',
    customRender: (text,record,index)=>`${index+1}`,
    width:'5%',
    align:'center'
  },
  {
    title:'商品名称',
    dataIndex: 'stock_name',
    width:'7%',
    align:'center'
  },
  {
    title:'品牌',
    dataIndex: 'response_brand',
    width:'5%',
    align:'center'
  },
  {
    title:'规格',
    dataIndex: 'response_standard',
    width:'6%',
    align:'center'
  },
  {
    title:'采购单位',
    dataIndex: 'price_unit_name',
    width:'6%',
    align:'center'
  },
  {
    title:'预估采购数量',
    dataIndex: 'number',
    width:'8%',
    align:'center'
  },
  {
    title:'单价（元）',
    dataIndex: 'price',
    width:'9%',
    align:'center',
    scopedSlots: { customRender: 'price' }
  }
];
export default {
  components: {
    enquiry
  },
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      formData:{},
      data:[],
      win_supply_info:{},
      id:'',
      inquiry_code:'',
      region_area:'',
      columns,
      columns2,
      columns3,
      pagination:{
        showQuickJumper:true,
        showSizeChanger:true,
        pageSizeOptions:['10','20','30'],
        showTotal:()=>{
          return `共${this.data.length}条数据`
        }
      }
    };
  },
  filters:{
    is_exam(key){
      switch (key) {
        case '1':
          return '是'
          break;
        case 1:
          return '是'
          break;
        default:
          return '否'
          break;
      }
    }
  },
  created() {
    // this.statusKey = this.$route.query.statusKey;
    // if(this.statusKey ==8) this.status = '已中标';
    this.father.selectedKeys = ['/Inquiry/get_notice_list'];
    this.inquiry_code = this.$route.query.inquiry_code;
    get_inquiry_base_info(this.inquiry_code)
      .then(res => {
        this.formData = res.data;
        this.data = res.data.stock_list;
        this.win_supply_info = res.data.win_supply_info;
        var list = res.data.shipping_region_list;
        var region_area='';
        list.forEach(elem => {
          region_area +=elem.name+'，';
        });
        this.region_area = region_area.slice(0,-1);
      })
      .catch(error => {
        this.$message.error(error)
      });
  }
};
</script>
<style lang="scss" scoped>
  @import "~@admin/assets/scss/enquiry/offer";
</style>