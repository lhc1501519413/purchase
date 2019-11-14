<template>
  <div id="enquiryList">
    <h5>在线询价 / 询价单管理</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input style="width: 65%" v-model="keyword" @keyup.13="get_inquiry_list_method2" placeholder="模糊搜索：询价标题/询价单号"/>
        </a-col>
        <a-col :span="6">
          <span>状态：</span>
          <a-select 
              allowClear 
              v-model='status'
              dropdownMatchSelectWidth 
              style="width: 80%" 
              @change="get_inquiry_list_method2"
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
            @change="get_inquiry_list_method2" 
          />
        </a-col>
        <a-col :span="5">
          <a-button @click="get_inquiry_list_method2" type="primary">搜索</a-button>
        </a-col>
      </a-row>
      <a-table class="table" :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
        <template slot="code" slot-scope="value,record">
          <router-link :to="{path:'/offerInfo',query:{inquiry_code:record.inquiry_code,id:record.id}}">
            {{value}}
          </router-link>
        </template>
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <div v-if="priv.supply_inquiry_list.report&&text.status==1">
            <router-link :to="{path:'/offer',query:{inquiry_code:text.inquiry_code}}">
              报价
            </router-link>
          </div>
          <div v-if="text.status==2">
            <router-link v-if="priv.supply_inquiry_list.view" :to="{path:'/offerInfo',query:{inquiry_code:text.inquiry_code,id:text.id}}">
              报价信息
            </router-link>
            <a v-if="priv.supply_inquiry_list.cancel" @click="cancel(text.inquiry_code)" href="javascript:;">取消报价</a>
          </div>
          <div v-if="text.status==6">
            <router-link v-if="priv.supply_inquiry_list.view" :to="{path:'/offerInfoReback',query:{inquiry_code:text.inquiry_code}}">
              报价信息
            </router-link>
            <a v-if="priv.supply_inquiry_list.delete" @click="del(text.code)" href="javascript:;">删除</a>
          </div>
          <div v-if="priv.supply_inquiry_list.view&&text.status==4">
            <router-link :to="{path:'/offerInfoConfirm',query:{inquiry_code:text.inquiry_code,id:text.id}}">
              报价信息
            </router-link>
          </div>
          <div v-if="priv.supply_inquiry_list.view&&text.status==8">
            <router-link :to="{path:'/dealSupply',query:{inquiry_code:text.inquiry_code,statusKey:text.status}}">
              成交信息
            </router-link>
          </div>
          <div v-if="priv.supply_inquiry_list.view&&(text.status==7||text.status==9||text.status==10)">
            <router-link :to="{path:'/dealSupply',query:{inquiry_code:text.inquiry_code,statusKey:text.status}}">
              成交信息
            </router-link>
          </div>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import { 
  supply_inquiry_list, // 询价单列表
  del_supply_inquiry, // 报价询价单删除
  cancel_supply_report // 报价询价单取消报价
} from '@admin/api/enquiry_supply';

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
        {value:'1',label:'待报价'},
        {value:'2',label:'已报价'},
        {value:'4',label:'采购方确认中'},
        {value:'6',label:'采购方已撤回'},
        {value:'7',label:'未中标'},
        {value:'8',label:'已中标'},
        {value:'9',label:'重新询价'},
        {value:'10',label:'取消询价'},
      ],
      rangePicker:[],
      page:'',
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
          title: '询价标题',
          className: 'column-money',
          dataIndex: 'title',
          width:'10%'
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'10%'
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
          width:'10%'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
          width:'20%'
        }
      ],
      total:null,
    };
  },
  filters:{
    status:(key)=>{
      switch (key) {
        case '1':
          return '待报价'
          break;
        case '2':
          return '已报价'
          break;
        case '4':
          return '采购方确认中'
          break;
        case '6':
          return '采购方已撤回'
          break;
        case '7':
          return '未中标'
          break;
        case '8':
          return '已中标'
          break;
        case '9':
          return '重新询价'
          break;
        default:
          return '取消询价'
          break;
      }
    }
  },
  created() {
    this.status = this.$route.params.status||'0';
    this.father.selectedKeys = ['/Supplyinquiry/supply_inquiry_list'];
    this.get_inquiry_list_method();
  },
  methods: {
    get_inquiry_list_method2(){
      this.page = 1;
      this.get_inquiry_list_method();
    },
    get_inquiry_list_method(){
      var params = {};
      params.keyword = this.keyword;
      params.start_date = this.rangePicker[0]?this.rangePicker[0].format('YYYY-MM-DD'):'';
      params.end_date = this.rangePicker[1]?this.rangePicker[1].format('YYYY-MM-DD'):'';
      params.status = this.status;
      params.page = this.page;
      supply_inquiry_list(params).then(res=>{
        this.dataSource = res.data.list;
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    submit(id){
      var self = this;
      this.$confirm({
        title: '确认提交此询价单?',
        onOk() {
          inquiry_submit(id).then(res=>{
            self.$message.success(res.msg)
            self.get_inquiry_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    re_back(id){
      var self = this;
      this.$confirm({
        title: '确认撤销此询价单?',
        onOk() {
          inquiry_re_back(id).then(res=>{
            self.$message.success(res.msg);
            self.get_inquiry_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    cancel(inquiry_code){
      var self = this;
      this.$confirm({
        title: '确认取消询价吗?',
        onOk() {
          cancel_supply_report(inquiry_code).then(res=>{
            self.$message.success(res.msg)
            self.get_inquiry_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    reject(id){
      var self = this;
      this.$confirm({
        title: '确认驳回此询价单?',
        onOk() {
          inquiry_refuse(id).then(res=>{
            self.$message.success(res.msg)
            self.get_inquiry_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    del(inquiry_code){
      var self = this;
      this.$confirm({
        title: '确认删除此询价单?',
        onOk() {
          del_supply_inquiry(inquiry_code).then(res=>{
            self.$message.success(res.msg)
            self.get_inquiry_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.page = page;
      this.get_inquiry_list_method();
    },
  },
};
</script>
<style lang="scss" scoped>
  @import '~@admin/assets/scss/enquiry/enquiryList';
</style>