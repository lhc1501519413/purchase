<template>
  <div id="enquiryList">
    <h5>在线询价 / 询价单管理</h5>
    <section class="content">
      <a-row>
        <a-col :span="5">
          <span>模糊搜索：</span>
          <a-input style="width: 65%" v-model="keyword" @keyup.13="get_inquiry_list_method2" placeholder="模糊搜索：询价标题/询价单号"/>
        </a-col>
        <a-col :span="5">
          <span>状态：</span>
          <a-select 
              allowClear 
              v-model='status'
              dropdownMatchSelectWidth 
              style="width: 75%" 
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
          <a-button v-if="priv.inquiry_list.add" @click="new_add" class="ml" type="primary">新增询价单</a-button>
        </a-col>
      </a-row>
      <a-table class="table" :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <div v-if="text.status==1">
            <router-link v-if="priv.inquiry_list.edit" :to="{path:'/addEnquiry',query:{code:text.code,id:text.id}}">
              编辑
            </router-link>
            <router-link v-if="priv.inquiry_list.view" :to="{path:'/detail',query:{code:text.code,id:text.id}}">
              详情
            </router-link>
            <a @click="submit(text.id)" v-if="priv.inquiry_list.submit" href="javascript:;">提交</a>
            <a @click="del(text.id)" v-if="priv.inquiry_list.delete" href="javascript:;">删除</a>
          </div>
          <div v-if="text.status==2">
            <router-link v-if="priv.inquiry_list.audit" :to="{path:'/audit',query:{code:text.code,id:text.id}}">
              审核
            </router-link>
            <a @click="reject(text.id)" v-if="priv.inquiry_list.refuse" href="javascript:;">驳回</a>
            <a @click="del(text.id)" v-if="priv.inquiry_list.delete" href="javascript:;">删除</a>
          </div>
          <div v-if="text.status==3">
            <router-link v-if="priv.inquiry_list.view" :to="{path:'/auditedDetail',query:{code:text.code,id:text.id}}">
              报价信息
            </router-link>
            <a @click="re_back(text.id)" v-if="priv.inquiry_list.reback" href="javascript:;">撤销</a>
          </div>
          <div v-if="text.status==4&&priv.inquiry_list.confirm&&priv.inquiry_list.give_up">
            <router-link :to="{path:'/beforeDeal',query:{code:text.code,id:text.id}}">
              预成交信息
            </router-link>
          </div>
          <div v-if="text.status==6">
            <router-link v-if="priv.inquiry_list.view" :to="{path:'/rebackDetail',query:{code:text.code,id:text.id}}">
              详情
            </router-link>
            <a @click="del(text.id)" v-if="priv.inquiry_list.delete" href="javascript:;">删除</a>
          </div>
          <div v-if="text.status==8||text.status==9||text.status==10">
            <router-link  v-if="priv.inquiry_list.view" :to="{path:'/deal',query:{code:text.code,id:text.id,statuskey:text.status}}">
              成交信息
            </router-link>
            <router-link  v-if="priv.inquiry_list.add&&text.show_copy==1" :to="{path:'/relevance',query:{code:text.code}}">
              关联
            </router-link>
            <a v-if="text.show_end==1" @click="termination(text.code)" href="javascript:;">终止</a>
          </div>
        </template>
      </a-table>
      <a-pagination showQuickJumper :total="total" @change="paginationChange" />
    </section>
  </div>
</template>

<script>
import {
  get_inquiry_list,
  inquiry_refuse, // 驳回
  inquiry_submit, // 提交
  inquiry_re_back, // 撤销
  inquiry_del, // 删除
  end_contract, // 终止
} from '@admin/api/enquiry';

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
        {value:'1',label:'待提交'},
        {value:'2',label:'待审核'},
        {value:'3',label:'已发布'},
        {value:'4',label:'待确认'},
        {value:'6',label:'已撤销'},
        {value:'8',label:'完成询价'},
        {value:'9',label:'重新询价'},
        {value:'10',label:'取消询价'}
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
      total:0
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
          return '已发布'
          break;
        case '4':
          return '待确认'
          break;
        case '6':
          return '已撤销'
          break;
        case '8':
          return '询价完成'
          break;
        case '9':
          return '重新询价'
          break;
        case '10':
          return '取消询价'
          break;
        default:
          return '未知状态'
          break;
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Inquiry/get_inquiry_list'];
    this.status = this.$route.params.status || '0';
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
      get_inquiry_list(params).then(res=>{
        this.dataSource = res.data.list;
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    new_add(){
      this.$router.push({name:'addEnquiry'})
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
    del(id){
      var self = this;
      this.$confirm({
        title: '确认删除此询价单?',
        onOk() {
          inquiry_del(id).then(res=>{
            self.$message.success(res.msg)
            self.get_inquiry_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    termination(inquiry_code){
      var self = this;
      this.$confirm({
        title: '确认终止采购供应吗？',
        content:'终止采购供应将直接影响采购，您确定终止吗？',
        onOk() {
          end_contract(inquiry_code).then(res=>{
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