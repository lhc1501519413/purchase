<template>
  <div id="noticeList">
  <h5>在线询价 / 询价单管理 / 公告管理</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input style="width: 65%" v-model="keyword" @keyup.13="get_notice_list_method2" placeholder="模糊搜索：公告标题/询价单号"/>
        </a-col>
        <a-col :span="6">
          <span>状态：</span>
          <a-select 
              allowClear 
              v-model='status'
              dropdownMatchSelectWidth 
              style="width: 80%" 
              @change="get_notice_list_method2"
            >
            <a-select-option v-for="item of statusList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="8">
          <span>报价时间：</span>
          <a-range-picker 
            style="width: 70%" 
            v-model="rangePicker"
            format="YYYY-MM-DD"
            @change="get_notice_list_method2" 
          />
        </a-col>
        <a-col :span="5">
          <a-button @click="get_notice_list_method2" type="primary">搜索</a-button>
        </a-col>
      </a-row>
    <a-table class="table" :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
      <template slot="titleRender" slot-scope="value,record">
          <span>
            {{value}}
            {{record.status==8?'的在线询价成交公告':'的在线询价终止公告'}}
          </span>
        </template>
      <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="value,text">
          <router-link :to="{path:'/noticeSupplyDetail',query:{inquiry_code:text.code}}">
            详情
          </router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" v-model='page' @change="paginationChange" />
  </section>
  </div>
</template>

<script>
import { 
  get_notice_list, // 公告列表
} from '@admin/api/enquiry_supply';
export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      keyword:'',
      status:'0',
      statusList:[
        {value:'0',label:'全部'},
        {value:'8',label:'询价完成'},
        {value:'9',label:'重新询价'},
        {value:'10',label:'取消询价'},
      ],
      rangePicker:[],
      page:1,
      dataSource: [],
      columns:[
        {
          title:'序号',
          customRender: (text,record,index)=>`${index+1}`,
          width:'6%',
          align:'center'
        },
        {
          title: '询价单号',
          dataIndex: 'code',
          width:'10%',
          scopedSlots: { customRender: 'code' },
        },
        {
          title: '公告标题',
          className: 'column-money',
          dataIndex: 'title',
          scopedSlots: { customRender: 'titleRender' },
          width:'12%'
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'12%'
        },
        {
          title: '开始时间',
          dataIndex: 'start_date',
          width:'15%'
        },
        {
          title: '结束时间',
          dataIndex: 'end_date',
          width:'15%'
        },
        {
          title: '状态',
          dataIndex:'status',
          scopedSlots: { customRender: 'status' },
          width:'15%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:'15%'
        }
      ],
      total:null,
    };
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '8':
          return '询价完成'
          break;
        case '9':
          return '重新询价'
          break;
        case '10':
          return '取消询价'
          break;
        default :
          return '未知'
          break;
      }
    }
  },
  created() {
    this.get_notice_list_method();
    this.father.selectedKeys = ['/Supplyinquiry/get_notice_list'];
  },
  methods: {
    get_notice_list_method2(){
      this.page = 1;
      this.get_notice_list_method();
    },
    get_notice_list_method(){
      var params = {};
      params.keyword = this.keyword;
      params.start_date = this.rangePicker[0]?this.rangePicker[0].format('YYYY-MM-DD'):'';
      params.end_date = this.rangePicker[1]?this.rangePicker[1].format('YYYY-MM-DD'):'';
      params.status = this.status;
      params.page = this.page;
      get_notice_list(params).then(res=>{
        this.dataSource = res.data.list;
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    paginationChange(page) {
      this.page = page;
      this.get_notice_list_method();
    },
  }
};
</script>
<style lang="scss" scoped>
  @import '~@admin/assets/scss/enquiry/noticeList';
</style>