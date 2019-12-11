<template>
  <div id="contract">
    <h5>招标管理 / 合同管理 / 合同列表</h5>
    <section class="content">
      <a-row>
        <a-col :span="7">
          <span>模糊搜索：</span>
          <a-input style="width: 70%" v-model="keyword" @keyup.13="get_bid_contract_list_method2" placeholder="模糊搜索：合同编号/合同名称"/>
        </a-col>
        <a-col :span="6" class="ml">
          <span>状态：</span>
          <a-select 
              allowClear 
              v-model='status'
              dropdownMatchSelectWidth 
              style="width: 80%" 
              @change="get_bid_contract_list_method2"
            >
            <a-select-option v-for="item of statusList" :value="item.value" :key="item.value">{{item.label}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="5" class="ml">
          <a-button @click="get_bid_contract_list_method2" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table class="table" 
        :dataSource="dataSource" 
        :columns="columns" 
        :pagination="false" 
        rowKey="id"
      >
        <template slot="titleRender" slot-scope="value">
          <span>
            {{value}}
          </span>
        </template>
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <router-link v-if='priv.bid_contract_list.edit && text.status==1' :to="{path:'/Contract/add_contract',query:{code:text.code}}">
            起草
          </router-link>
          <a v-if='text.status==1||text.status==3' @click="submit(text.code)" href="javascript:;">提交</a>
          <router-link v-if='priv.bid_contract_list.view && text.status==2||text.status==3||text.status==8' :to="{path:'/Contract/contract_detail',query:{code:text.code}}">
            详情
          </router-link>
          <router-link v-if='priv.bid_contract_list.edit && text.status==3' :to="{path:'/Contract/add_contract',query:{code:text.code}}">
            编辑
          </router-link>
          <router-link v-if='priv.bid_contract_list.confirm && text.status==4' :to="{path:'/Contract/confirm_contract',query:{code:text.code}}">
            确认
          </router-link>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" v-model="page" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import {
  get_bid_contract_list, // 合同列表
  submit_bid_contract // 提交合同
} from '@admin/api/bidsContract';

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
        {value:'1',label:'待起草'},
        {value:'2',label:'待供应商确认'},
        {value:'3',label:'供应商已退回'},
        {value:'4',label:'待确认'},
        {value:'8',label:'已完成'},
      ],
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
          title: '合同编号',
          dataIndex: 'code',
          width:'10%',
        },
        {
          title: '合同名称',
          dataIndex: 'title',
          width:'16%',
          scopedSlots: { customRender: 'titleRender' },
        },
        {
          title: '项目编号',
          dataIndex: 'custom_code',
          width:'8%',
        },
        {
          title: '项目名称',
          dataIndex: 'custom_title',
          width:'14%',
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'14%',
        },
        {
          title: '供应商名称',
          dataIndex: 'supply_name',
          width:'15%',
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
        case '1':
          return '待起草'
        case '2':
          return '待供应商确认'
        case '3':
          return '供应商已退回'
        case '4':
          return '待确认'
        case '8':
          return '已完成'
        default:
          return '未知状态'
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Contract/get_bid_contract_list'];
    this.status = this.$route.params.status || '0';
    this.get_bid_contract_list_method();
  },
  methods: {
    get_bid_contract_list_method2(){
      this.page = 1;
      this.get_bid_contract_list_method();
    },
    get_bid_contract_list_method(){
      var params = {};
      params.keyword = this.keyword;
      params.status = this.status;
      params.page = this.page;
      get_bid_contract_list(params).then(res=>{
        this.dataSource = res.data.list||[];
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    submit(code){
      var self = this;
      this.$confirm({
        title: '确认提交此合同？',
        onOk() {
          submit_bid_contract({code}).then(res=>{
            self.$message.success(res.msg)
            self.get_bid_contract_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.page = page;
      this.get_bid_contract_list_method();
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '~@admin/assets/scss/common';
  #contract{
    @include component;
  }
</style>