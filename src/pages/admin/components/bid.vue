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
        <a-col :span='2' :offset='1'>项目名称：</a-col>
        <a-col :span='6'>{{formData.title}}</a-col>
        <a-col :span='2' :offset='1'>项目编号：</a-col>
        <a-col :span='6'>{{formData.custom_code}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span='2' :offset='1'>采购单位：</a-col>
        <a-col :span='6'>{{formData.com_name}}</a-col>
        <a-col :span='2' :offset='1'>采购方式：</a-col>
        <a-col :span='6'>{{formData.com_name}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span='2' :offset='1'>采购联系人：</a-col>
        <a-col :span='6'>{{formData.contact_name}}</a-col>
        <a-col :span='2' :offset='1'>联系方式：</a-col>
        <a-col :span='6'>{{formData.contact_number}}</a-col>
      </a-row>
      <a-row class="mb-10">
        <a-col :span='2' :offset='1'>配送区域：</a-col>
        <a-col :span='8'>{{formData.region_name}}</a-col>
      </a-row>
      <a-row>
        <a-col :span='8' :offset='3'>{{region_area}}</a-col>
      </a-row>
    </section>
    <section class="content">
      <h4>商品信息</h4>
      <a-row>
        <a-col :span='6' :offset='1'>采购类别：{{formData.cat_name}}</a-col>
        <a-col :span='8'>预计配送时间：{{formData.shipping_days}}天</a-col>
      </a-row>
      <a-table 
        rowKey="id" 
        :columns="columns" 
        :dataSource="stock_list"
        :pagination='pagination'
        >
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
  }
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
          return `共${this.formData.stock_list.length}条数据`
        }
      }
    };
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '1':
          return '待提交'
          break;
        case '2':
          return '待审核'
          break;
        case '3':
          return '项目已驳回'
          break;
        case '8':
          return '采购文件待制作'
          break;
        case '9':
          return '采购文件待审核'
          break;
        case '10':
          return '采购文件已驳回'
          break;
        case '11':
          return '采购公告已发布'
          break;
        case '15':
          return '待开标'
          break;
        case '16':
          return '评审中'
          break;
        case '17':
          return '采购人确认中'
          break;
        case '18':
          return '采购结果公告已发布'
          break;
        default:
          return '未知状态'
          break;
      }
    }
  },
  computed:{
    stock_list(){
      return this.formData.stock_list||[]
    }
  }
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#bid{
  width: 100% !important;
  @include component;
}
</style>