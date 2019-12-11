<template>
  <div id="contractSupply">
    <h5>合同管理 / 合同列表</h5>
    <section class="content">
      <a-row>
        <a-col :span="7">
          <span>模糊搜索：</span>
          <a-input style="width: 70%" v-model="keyword" @keyup.13="get_bid_scontract_list_method2" placeholder="模糊搜索：合同编号/合同名称"/>
        </a-col>
        <a-col :span="6" class="ml">
          <span>状态：</span>
          <a-select 
              allowClear 
              v-model='status'
              dropdownMatchSelectWidth 
              style="width: 80%" 
              @change="get_bid_scontract_list_method2"
            >
            <a-select-option v-for="item of statusList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5" class="ml">
          <a-button @click="get_bid_scontract_list_method2" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table class="table" 
        :dataSource="dataSource" 
        :columns="columns" 
        :pagination="false" 
        rowKey="id"
      >
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <router-link v-if='priv.bid_supply_contract_list.confirm&&priv.bid_supply_contract_list.refuse&&text.status==2' :to="{path:'/Scontract/confirm_contract',query:{code:text.code}}">
            确认
          </router-link>
          <router-link v-if='priv.bid_supply_contract_list.view&&text.status==3' :to="{path:'/Scontract/contract_detail',query:{code:text.code}}">
            查看详情
          </router-link>
          <router-link v-if='priv.bid_supply_contract_list.view&&text.status==4||text.status==8' :to="{path:'/Scontract/contract_detail',query:{code:text.code}}">
            查看详情
          </router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" v-model="page" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import {
  get_bid_scontract_list // 合同列表
} from '@admin/api/bidsContractSupply';

export default {
  props:{
    father:{
      type:Object
    }
  },
  data() {
    return {
      priv:this.$store.getters.priv,
      keyword:'',
      status:'0',
      statusList:[
        {value:'0',label:'全部'},
        {value:'2',label:'待确认'},
        {value:'3',label:'已退回'},
        {value:'4',label:'待采购方确认'},
        {value:'8',label:'已完成'},
      ],
      page:1,
      dataSource: [],
      columns:[
        {
          title:'序号',
          customRender: (text,record,index)=>`${index+1}`,
          width:'7%',
          align:'center'
        },
        {
          title: '合同编号',
          dataIndex: 'code',
          width:'8%',
          scopedSlots: { customRender: 'code' },
        },
        {
          title: '合同名称',
          dataIndex: 'title',
          width:'16%',
        },
        {
          title: '项目编号',
          dataIndex: 'custom_code',
          width:'8%',
        },
        {
          title: '项目名称',
          dataIndex: 'custom_title',
          width:'16%',
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'14%',
        },
        {
          title: '成交金额（元）',
          dataIndex: 'total_money',
          width:'10%',
        },
        {
          title: '状态',
          dataIndex:'status',
          scopedSlots: { customRender: 'status' },
          width:'8%',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:'10%',
        }
      ],
      total:100
    };
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '2':
          return '待确认'
        case '3':
          return '已退回'
        case '4':
          return '待采购方确认'
        case '8':
          return '已完成'
        default:
          return '未知状态'
      }
    }
  },
  created() {
    this.status = this.$route.params.status||'0';
    this.get_bid_scontract_list_method();
    this.father.selectedKeys = ['/Scontract/get_bid_scontract_list'];
  },
  methods: {
    get_bid_scontract_list_method2(){
      this.page = 1;
      this.get_bid_scontract_list_method();
    },
    get_bid_scontract_list_method(){
      var params = {};
      params.keyword = this.keyword;
      params.status = this.status;
      params.page = this.page;
      get_bid_scontract_list(params).then(res=>{
        this.dataSource = res.data.list;
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    paginationChange(page) {
      this.page = page;
      this.get_bid_scontract_list_method();
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '~@admin/assets/scss/common';
  #contractSupply{
    @include component;
  }
</style>