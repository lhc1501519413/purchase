<template>
  <div id="enquiry">
    <h3>
      <span>
        <span>
          询价单编号：{{formData.code}}
        </span>
        <span class="ml-20" v-if="formData.from_inquiry_code">
          关联询价单编号：{{formData.from_inquiry_code}}
        </span>
      </span>
      <span class="status">
        状态：{{status}}
      </span>
    </h3>
    <section class="content">
      <h4>询价基本信息</h4>
      <a-row>
        <a-col :span='2' :offset='1'>询价标题：</a-col>
        <a-col :span='6'>{{formData.title}}</a-col>
        <a-col v-show="status!='待提交'" :span='2' :offset='1'>报价时间：</a-col>
        <a-col v-show="status!='待提交'" :span='6'>{{formData.start_date}}  ~  {{formData.end_date}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>询价单位：</a-col>
        <a-col :span='8'>{{formData.com_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>联系人：</a-col>
        <a-col :span='6'>{{formData.contact_name}}</a-col>
        <a-col :span='2' :offset='1'>联系方式：</a-col>
        <a-col :span='6'>{{formData.contact_number}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>成交规则：</a-col>
        <a-col :span='8'>{{formData.rule_type_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>供应商要求：</a-col>
        <a-col :span='8'>{{formData.remark}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>配送区域：</a-col>
        <a-col :span='8'>{{formData.region_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='8' :offset='3'>{{region_area}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='2' :offset='1'>配送要求：</a-col>
        <a-col :span='8'>{{formData.shipping_remark}}</a-col>
      </a-row>
    </section>
    <section class="content">
      <h4>询价商品信息</h4>
      <a-row>
        <a-col :span='6' :offset='1'>询价大类：{{formData.cat_name}}</a-col>
        <a-col :span='8'>预计配送时间：{{formData.shipping_days}}天</a-col>
      </a-row>
      <a-table 
        rowKey="id" 
        :columns="columns" 
        :dataSource="data"
        :pagination='pagination'
      >
      <template slot="is_exam" slot-scope="value">
        {{value|is_exam}}
      </template>
      </a-table>
    </section>
  </div>
</template>

<script>
const columns = [
  {
    title:'序号',
    customRender: (text,record,index)=>`${index+1}`,
    width:'14%',
    align:'center'
  },
  {
    title:'商品名称',
    dataIndex: 'stock_name',
    width:'14%',
    align:'center'
  },
  {
    title:'品牌',
    dataIndex: 'brand',
    width:'14%',
    align:'center'
  },
  {
    title:'规格',
    dataIndex: 'standard',
    width:'14%',
    align:'center'
  },
  {
    title:'采购单位',
    dataIndex: 'price_unit_name',
    width:'14%',
    align:'center'
  },
  {
    title:'预估采购数量',
    dataIndex: 'number',
    width:'14%',
    align:'center'
  },
  {
    title:'提供产品检测报告',
    dataIndex: 'is_exam',
    width:'14%',
    align:'center',
    scopedSlots: { customRender: 'is_exam' }
  },
];
export default {
  props: {
    formData: {
      type: Object,
      required: true
    },
    region_area:{
      type:String,
      required:true
    },
    status:{
      type:String,
      required:true
    }
  },
  data() {
    return {
      columns,
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
        case 1:
          return '是'
          break;
        case '1':
          return '是'
          break;
        default:
          return '否'
          break;
      }
    }
  },
  computed:{
    data(){
      return this.formData.stock_list||[]
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@admin/assets/scss/enquiry/enquiry";
</style>