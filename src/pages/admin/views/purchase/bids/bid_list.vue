<template>
  <div id="bids">
    <h5>招标管理 / 招标项目管理</h5>
    <section class="content">
      <search-condition 
        ref="condition" 
        @change-data="bid_list_method2" 
        :statusKey="status"
        :statusList="statusList" 
        :bid_type_list="bid_type_list" 
        :father="this"
        >
        <template #new_add>
          <a-button v-if="priv.bid_list.add" @click="new_add" class="ml-10" type="primary">新增项目</a-button>
        </template>
      </search-condition>
      <a-table class="table" :dataSource="dataSource" :columns="columns" :pagination="false" rowKey="id">
        <template slot="status" slot-scope="value">
          <span>
            {{value|status}}
          </span>
        </template>
        <template slot="operation" slot-scope="text">
          <div v-if="text.status==1||text.status==3">
            <router-link v-if="priv.bid_list.edit" :to="{path:'/addBids',query:{id:text.id}}">
              编辑
            </router-link>
            <router-link v-if="priv.bid_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
            <a @click="del(text.id)" v-if="priv.bid_list.delete" href="javascript:;">删除</a>
            <a @click="submit(text.id)" v-if="priv.bid_list.submit" href="javascript:;">提交</a>
          </div>
          <div v-if="text.status==2">
            <router-link v-if="priv.bid_list.audit" :to="{path:'/auditBid',query:{id:text.id}}">
              审核
            </router-link>
            <a @click="reject(text.id)" v-if="priv.bid_list.refuse" href="javascript:;">驳回</a>
            <router-link v-if="priv.bid_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
          </div>
          <div v-if="text.status==8">
            <router-link v-if="priv.purchase_list.edit" :to="{path:'/addPurchaseDoc',query:{id:text.id}}">
              制作
            </router-link>
            <router-link v-if="priv.bid_list.view" :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
            </router-link>
            <a @click="del(text.id)" v-if="priv.bid_list.delete" href="javascript:;">删除</a>
          </div>
          <div v-if="(text.status==9||text.status==10||text.status==11||text.status==15||text.status==16||text.status==17||text.status==18)&&priv.bid_list.view">
            <router-link :to="{path:'/bidDetail',query:{id:text.id}}">
              查看项目
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
  get_bid_type // 采购方式
} from "@common/js/apis";
import {
  bid_list, // 招标列表
  submit_bid, // 提交
  refuse_bid, // 驳回
  del_bid // 删除
} from '@admin/api/bids'
export default {
  components:{
    'search-condition':()=>import('@admin/components/searchCondition')
  },
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
        {value:'3',label:'项目已驳回'},
        {value:'8',label:'采购文件待制作'},
        {value:'9',label:'采购文件待审核'},
        {value:'10',label:'采购文件已驳回'},
        {value:'11',label:'采购公告已发布'},
        {value:'15',label:'待开标'},
        {value:'16',label:'评审中'},
        {value:'17',label:'采购人确认中'},
        {value:'18',label:'采购结果公告已发布'},
        {value:'20,21',label:'已流标'}
      ],
      bid_type:'',
      bid_type_list:[
        {value:'0',title:'全部'}
      ],
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
          title: '项目编号',
          dataIndex: 'custom_code',
          width:'10%'
        },
        {
          title: '项目名称',
          dataIndex: 'title',
          width:'10%'
        },
        {
          title: '采购单位',
          dataIndex: 'com_name',
          width:'10%'
        },
        {
          title: '采购方式',
          dataIndex: 'bid_type_name',
          width:'15%'
        },
        {
          title: '采购类别',
          dataIndex: 'cat_name',
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
        case '2':
          return '待审核'
        case '3':
          return '项目已驳回'
        case '8':
          return '采购文件待制作'
        case '9':
          return '采购文件待审核'
        case '10':
          return '采购文件已驳回'
        case '11':
          return '采购公告已发布'
        case '15':
          return '待开标'
        case '16':
          return '评审中'
        case '17':
          return '采购人确认中'
        case '18':
          return '采购结果公告已发布'
        case '20':
          return '已流标'
        case '21':
          return '已流标'
        default:
          return '未知状态'
      }
    }
  },
  created() {
    this.father.selectedKeys = ['/Bid/bid_list'];
    this.status = this.$route.params.status || '0';
    this.bid_list_method();
    this.get_tree_data();
  },
  methods: {
    get_tree_data() {
      get_bid_type()
        .then(res => {
          this.bid_type_list = [...this.bid_type_list,...this.$common.treeSelectFormat(res.data)];
        })
        .catch();
    },
    bid_list_method2(){
      this.page = 1;
      this.keyword = this.$refs.condition.keyword;
      this.status = this.$refs.condition.status;
      this.bid_type = this.$refs.condition.bid_type;
      this.bid_list_method();
    },
    bid_list_method(){
      var params={};
      params.page = this.page;
      params.keyword = this.keyword;
      params.status = this.status;
      params.bid_type = this.bid_type;
      bid_list(params).then(res=>{
        this.dataSource = res.data.list||[];
        this.total = +res.data.total_count;
      }).catch(error=>this.$message.error(error))
    },
    new_add(){
      this.$router.push({name:'addBids'})
    },
    submit(id){
      var self = this;
      this.$confirm({
        title: '确认提交此招标项目？',
        onOk() {
          submit_bid(id).then(res=>{
            self.$message.success(res.msg)
            self.bid_list_method();
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
        title: '确认驳回此招标项目？',
        onOk() {
          refuse_bid(id).then(res=>{
            self.$message.success(res.msg)
            self.bid_list_method();
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
        title: '确认删除此招标项目？',
        onOk() {
          del_bid(id).then(res=>{
            self.$message.success(res.msg)
            self.bid_list_method();
          }).catch(error=>{
            self.$message.error(error)
          })
        },
        onCancel() {},
      });
    },
    paginationChange(page) {
      this.page = page;
      this.bid_list_method();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@admin/assets/scss/common';
#bids{
  @include component;
}
</style>